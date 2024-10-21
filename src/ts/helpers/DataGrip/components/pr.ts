import { ISystemCommit } from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import { WeightedAverage } from 'ts/helpers/Math';
import { ONE_DAY } from 'ts/helpers/formatter';

export default class DataGripByPR {
  pr: HashMap<any> = new Map();

  statistic: any[] = [];

  statisticByName: IHashMap<any> = {};

  clear() {
    this.pr.clear();
    this.statistic = [];
    this.statisticByName = {};
  }

  addCommit(commit: ISystemCommit) {
    // commitType PR
    if (!commit.prId) return;
    const statistic = this.pr.get(commit.prId);
    if (statistic) {
      console.log('Parsing error. PR already exist.');
    } else {
      this.#addCommitByPR(commit);
    }
  }

  #addCommitByPR(commit: ISystemCommit) {
    this.pr.set(commit.prId, {
      prId : commit.prId,
      author: commit.author,
      task: commit.task,
      type: commit.type,
      branch: commit.branch,
      message: commit.message,
      dateCreate: commit.milliseconds, // last commit date before PR
      dateMerge: commit.milliseconds,
      daysReview: 1,
      daysInWork: 1,
    });
  }

  updateTotalInfo(dataGripByTasks: any, dataGripByAuthor: any) {
    const byAuthor = new Map();

    this.pr.forEach((pr: any) => {
      if (!pr.task) return;
      const task = dataGripByTasks.statisticByName.get(pr.task);
      if (!task) return;

      task.prIds.push(pr.prId);

      pr.daysInWork = task.daysInWork;
      let lastCommitDateBeforePR = task?.to || task?.from;
      if (lastCommitDateBeforePR > pr.dateMerge) {
        if (!task.timestamps) {
          console.log('x');
          return;
        }
        const more = task.timestamps.find((milliseconds: number) => milliseconds > pr.dateMerge);
        const index = task.timestamps.indexOf(more);
        lastCommitDateBeforePR = task.timestamps[index - 1];
        task.timestamps = task.timestamps.slice(index);
        pr.daysInWork = index;
      }
      // TODO он не мог быть пустым. Надо расследовать TASK-110 в тестовой выборке.
      pr.dateCreate = lastCommitDateBeforePR || pr.dateCreate;
      pr.daysReview = ((pr.dateMerge - pr.dateCreate) || ONE_DAY) / ONE_DAY;

      const list = byAuthor.get(pr.author);
      if (list) list.push(pr);
      else byAuthor.set(pr.author, [pr]);
    });

    this.statistic = Array.from(this.pr.values())
      .sort((a: any, b: any) => b.daysReview - a.daysReview);

    this.updateTotalByAuthor(byAuthor, dataGripByAuthor);
  }

  static getPRByGroups(list: any, propertyName: string) {
    const TITLES = {
      DAY: 'page.team.pr.chart.1day',
      THREE_DAY: 'page.team.pr.chart.3day',
      WEEK: 'page.team.pr.chart.7day',
      TWO_WEEK: 'page.team.pr.chart.14day',
      MONTH: 'page.team.pr.chart.30day',
      MORE: 'page.team.pr.chart.more',
    };

    const details = {
      [TITLES.DAY]: 0,
      [TITLES.THREE_DAY]: 0,
      [TITLES.WEEK]: 0,
      [TITLES.TWO_WEEK]: 0,
      [TITLES.MONTH]: 0,
      [TITLES.MORE]: 0,
    };

    let max = 0;

    const weightedAverage = new WeightedAverage();

    list.forEach((pr: any) => {
      const value = pr[propertyName];

      if (value > max) max = value;
      weightedAverage.update(value);

      if (value <= 1) details[TITLES.DAY]++;
      else if (value <= 2) details[TITLES.THREE_DAY]++;
      else if (value <= 7) details[TITLES.WEEK]++;
      else if (value <= 14) details[TITLES.TWO_WEEK]++;
      else if (value <= 30) details[TITLES.MONTH]++;
      else details[TITLES.MORE]++;
    });

    const order = Object.keys(details);

    return { details, order, weightedAverage: weightedAverage.get(), max };
  }

  updateTotalByAuthor(refAuthorPR: HashMap<any>, dataGripByAuthor: any) {
    this.statisticByName = {};
    refAuthorPR.forEach((prs: any) => {
      const author = prs[0].author;
      const stat = dataGripByAuthor.statisticByName[author];
      if (!stat || stat?.isStaff) return;

      const daysReview = DataGripByPR.getPRByGroups(prs, 'daysReview');
      const daysReviewWeightedAverage = parseInt(daysReview.weightedAverage.toFixed(1), 10);

      const daysInWork = DataGripByPR.getPRByGroups(prs, 'daysInWork');
      const daysInWorkWeightedAverage = parseInt(daysInWork.weightedAverage.toFixed(1), 10);

      this.statisticByName[author] = {
        author,
        maxDelayDays: daysReview.max,
        numberMergedPr: prs.length,

        workDays: daysInWork.details,
        delayDays: daysReview.details,
        weightedAverage: daysInWorkWeightedAverage + daysReviewWeightedAverage,
        weightedAverageDetails: {
          workDays: daysInWorkWeightedAverage,
          delayDays: daysReviewWeightedAverage,
        },
      };
    });
  }
}
