import { COMMIT_TYPE, ISystemCommit } from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import { createIncrement, increment, WeightedAverage } from 'ts/helpers/Math';

const IS_PR = {
  [COMMIT_TYPE.PR_BITBUCKET]: true,
  [COMMIT_TYPE.PR_GITHUB]: true,
  [COMMIT_TYPE.PR_GITLAB]: true,
};

export default class DataGripByPR {
  pr: HashMap<any> = new Map();

  prByTask: HashMap<any> = new Map();

  lastCommitByTaskNumber: HashMap<any> = new Map();

  statistic: any[] = [];

  statisticByName: IHashMap<any> = [];

  clear() {
    this.pr.clear();
    this.prByTask.clear();
    this.lastCommitByTaskNumber.clear();
    this.statistic = [];
  }

  addCommit(commit: ISystemCommit) {
    if (!commit.commitType) {
      const commitByTaskNumber = this.lastCommitByTaskNumber.get(commit.task);
      if (commitByTaskNumber) {
        this.#updateCommitByTaskNumber(commitByTaskNumber, commit);
      } else {
        this.#addCommitByTaskNumber(commit);
      }
    } else if (!this.pr.has(commit.prId) && IS_PR[commit.commitType || '']) {
      this.#addCommitByPR(commit);
    }
  }

  #addCommitByTaskNumber(commit: ISystemCommit) {
    this.lastCommitByTaskNumber.set(commit.task, {
      commits : 1,
      beginTaskTime: commit.milliseconds,
      endTaskTime: commit.milliseconds,
      commitsByAuthors: createIncrement(commit.author),
      firstCommit: commit,
    });
  }

  #updateCommitByTaskNumber(statistic: any, commit: ISystemCommit) {
    statistic.endTaskTime = commit.milliseconds;
    statistic.commits += 1;
    increment(statistic.commitsByAuthors, commit.author);
  }

  #addCommitByPR(commit: ISystemCommit) {
    const lastCommit = this.lastCommitByTaskNumber.get(commit.task);
    if (lastCommit) {
      // коммиты после влития PR сгорают, чтобы не засчитать технические PR мержи веток
      this.lastCommitByTaskNumber.delete(commit.task);
      const delay = commit.milliseconds - lastCommit.endTaskTime;
      const work = lastCommit.endTaskTime - lastCommit.beginTaskTime;
      this.pr.set(commit.prId, {
        ...commit,
        ...lastCommit,
        delay,
        delayDays: delay / (24 * 60 * 60 * 1000),
        workDays: work === 0 ? 1 : (work / (24 * 60 * 60 * 1000)),
      });
      this.prByTask.set(commit.task, commit.prId);
    } else {
      this.pr.set(commit.prId, { ...commit });
    }
  }

  updateTotalInfo(dataGripByAuthor: any) {
    const employment = dataGripByAuthor.employment;
    const authors = [...employment.active, ...employment.dismissed];
    const refAuthorPR: any = Object.fromEntries(authors.map((name: string) => ([name, []])));

    this.statistic = Object.values(this.pr)
      .filter((item: any) => item.delay && item.task)
      .sort((a: any, b: any) => b.delay - a.delay);

    this.statistic = [];
    this.statisticByName = {};

    Object.values(this.pr).forEach((item: any) => {
      if (!item.delay || !item.task) return;

      this.statistic.push(item);
      if (refAuthorPR[item.firstCommit.author]) {
        refAuthorPR[item.firstCommit.author].push(item);
      }
    });

    this.statistic.sort((a: any, b: any) => b.delay - a.delay);
    this.updateTotalByAuthor(authors, refAuthorPR);

    this.lastCommitByTaskNumber.clear();
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

    const weightedAverage = new WeightedAverage();

    list.forEach((pr: any) => {
      const value = pr[propertyName];

      weightedAverage.update(value);

      if (value <= 1) details[TITLES.DAY]++;
      else if (value <= 2) details[TITLES.THREE_DAY]++;
      else if (value <= 7) details[TITLES.WEEK]++;
      else if (value <= 14) details[TITLES.TWO_WEEK]++;
      else if (value <= 30) details[TITLES.MONTH]++;
      else details[TITLES.MORE]++;
    });

    const order = Object.keys(details);

    return { details, order, weightedAverage: weightedAverage.get() };
  }

  updateTotalByAuthor(authors: any, refAuthorPR: IHashMap<any>) {
    this.statisticByName = {};
    authors.map((name: string) => {

      let maxDelayDays = 0;
      refAuthorPR[name].forEach((pr: any) => {
        if (pr.delayDays > maxDelayDays) maxDelayDays = pr.delayDays;
      });

      // TODO: сложын и не интересные показатели. Гистаграмму?
      const delayDays = DataGripByPR.getPRByGroups(refAuthorPR[name], 'delayDays');
      const delayDaysWeightedAverage = parseInt(delayDays.weightedAverage.toFixed(1), 10);

      const workDays = DataGripByPR.getPRByGroups(refAuthorPR[name], 'workDays');
      const workDaysWeightedAverage = parseInt(workDays.weightedAverage.toFixed(1), 10);

      this.statisticByName[name] = {
        author: name,
        maxDelayDays,
        numberMergedPr: refAuthorPR[name].length,

        workDays: workDays.details,
        delayDays: delayDays.details,
        weightedAverage: workDaysWeightedAverage + delayDaysWeightedAverage,
        weightedAverageDetails: {
          workDays: workDaysWeightedAverage,
          delayDays: delayDaysWeightedAverage,
        },
      };
    });
  }
}
