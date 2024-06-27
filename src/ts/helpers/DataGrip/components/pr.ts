import { COMMIT_TYPE, ISystemCommit } from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';
import { increment, WeightedAverage } from 'ts/helpers/Math';

export default class DataGripByPR {
  pr: IHashMap<any> = {};

  prByTask: IHashMap<string> = {};

  lastCommitByTaskNumber: IHashMap<any> = {};

  statistic: any[] = [];

  statisticByName: IHashMap<any> = [];

  clear() {
    this.pr = {};
    this.prByTask = {};
    this.lastCommitByTaskNumber = {};
    this.statistic = [];
  }

  addCommit(commit: ISystemCommit) {
    if (!commit.commitType) {
      if (!this.lastCommitByTaskNumber[commit.task]) {
        this.#addCommitByTaskNumber(commit);
      } else {
        this.#updateCommitByTaskNumber(commit);
      }
    } else if (!this.pr[commit.prId]
      && [COMMIT_TYPE.PR_BITBUCKET, COMMIT_TYPE.PR_GITHUB].includes(commit.commitType)) {
      this.#addCommitByPR(commit);
    }
  }

  #addCommitByTaskNumber(commit: ISystemCommit) {
    this.lastCommitByTaskNumber[commit.task] = {
      commits : 1,
      beginTaskTime: commit.milliseconds,
      endTaskTime: commit.milliseconds,
      commitsByAuthors: {
        [commit.author]: 1,
      },
      firstCommit: commit,
    };
  }

  #updateCommitByTaskNumber(commit: ISystemCommit) {
    const statistic = this.lastCommitByTaskNumber[commit.task];
    statistic.endTaskTime = commit.milliseconds;
    statistic.commits += 1;
    increment(statistic.commitsByAuthors, commit.author);
  }

  #addCommitByPR(commit: ISystemCommit) {
    const lastCommit = this.lastCommitByTaskNumber[commit.task];
    if (lastCommit) {
      // коммиты после влития PR сгорают, чтобы не засчитать технические PR мержи веток
      delete this.lastCommitByTaskNumber[commit.task];
      const delay = commit.milliseconds - lastCommit.endTaskTime;
      const work = lastCommit.endTaskTime - lastCommit.beginTaskTime;
      this.pr[commit.prId] = {
        ...commit,
        ...lastCommit,
        delay,
        delayDays: delay / (24 * 60 * 60 * 1000),
        workDays: work === 0 ? 1 : (work / (24 * 60 * 60 * 1000)),
      };
      this.prByTask[commit.task] = commit.prId;
    } else {
      this.pr[commit.prId] = { ...commit };
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

    this.lastCommitByTaskNumber = {};
  }

  static getPRByGroups(list: any, propertyName: string) {
    const TITLES = {
      DAY: 'день',
      THREE_DAY: 'три дня',
      WEEK: 'неделя',
      TWO_WEEK: 'две недели',
      MONTH: 'месяц',
      MORE: 'более',
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
