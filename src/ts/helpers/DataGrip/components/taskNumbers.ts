import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import { WeightedAverage } from 'ts/helpers/Math';

export default class DataGripByTaskNumbers {
  commits: HashMap<any> = new Map();

  statistic: any = [];

  clear() {
    this.commits.clear();
    this.statistic = [];
  }

  addCommit(commit: ICommit) {
    if (!commit.taskCode || !commit.week) return;
    const statistic = this.commits.get(commit.taskCode);
    if (statistic) {
      this.#updateCommitByTaskCode(statistic, commit);
    } else {
      this.#addCommitByTaskCode(commit);
    }
  }

  #updateCommitByTaskCode(statistic: any, commit: ICommit) {
    const data = statistic.weekTaskNumber.get(commit.week);
    if (data) {
      if (data.max < commit.taskNumber) data.max = commit.taskNumber;
      data.all.add(commit.taskNumber);
      data.authors.add(commit.author);
    } else {
      this.#addWeekInfo(statistic.weekTaskNumber, commit);
    }
  }

  #addWeekInfo(data: any, commit: ICommit) {
    data.set(commit.week, {
      week: commit.week * (-1),
      date: commit.timestamp,
      month: commit.month,
      year: commit.year,
      max: commit.taskNumber,
      all: new Set([commit.taskNumber]),
      authors: new Set([commit.author]),
    });
  }

  #addCommitByTaskCode(commit: ICommit) {
    const weekTaskNumber = new Map();
    this.commits.set(commit.taskCode, {
      taskCode: commit.taskCode,
      weekTaskNumber,
    });
    this.#addWeekInfo(weekTaskNumber, commit);
  }

  updateTotalInfo() {
    this.statistic = {};

    Array.from(this.commits.values()).forEach((dot: any) => {
      const weeks = Array.from(dot.weekTaskNumber.values())
        .sort((a: any, b: any) => a.week - b.week) as any;

      const weightedAverage = new WeightedAverage();
      const months: any = [];
      let tasks = 0;
      let fixed = 0;
      let authors = 0;
      let monthIndex = weeks[0].month;
      let prev = 0;

      weeks.forEach((week: any) => {
        let newTasks = week.max - prev;
        newTasks = newTasks > 0 ? newTasks : 0;
        prev = week.max > prev ? week.max : prev;

        if (monthIndex === week.month) {
          tasks += newTasks;
          fixed += week.all.size;
          authors += week.authors.size;
          return;
        }

        monthIndex = week.month;

        const allAuthors = tasks > 0 && authors > 1
          ? Math.floor(tasks / (fixed / authors))
          : 0;

        const weeksInMonth = 4;
        const allAuthors1 = Math.floor(allAuthors / weeksInMonth);
        months.push({
          date: week.date,
          year: week.year,
          tasks,
          tasksInWeek: Math.floor(tasks / weeksInMonth),
          fixed: Math.floor(fixed / weeksInMonth),
          authors: Math.floor(authors / weeksInMonth) || 1,
          allAuthors: allAuthors1 || 1,
        });

        if (allAuthors1 > 1) weightedAverage.update(allAuthors1);

        tasks = newTasks;
        fixed = week.all.size;
        authors = week.authors.size;
      });

      const limit = weightedAverage.get() * 2;
      const formattedList = months
        .filter((item: any) => (
          item.authors > 1
          && item.tasks > 0
          && item.allAuthors > 1
          && item.allAuthors < limit
        ))
        .reverse();

      if (formattedList.length) {
        this.statistic[dot.taskCode] = formattedList;
      }
    });

    this.commits.clear();
  }
}
