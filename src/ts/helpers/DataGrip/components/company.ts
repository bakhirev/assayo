import ICommit from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import { createIncrement, increment } from 'ts/helpers/Math';

export default class DataGripByCompany {
  commits: HashMap<any> = new Map();

  statistic: any = [];

  statisticByName: IHashMap<any> = {};

  clear() {
    this.commits.clear();
    this.statistic = [];
    this.statisticByName = {};
  }

  addCommit(commit: ICommit) {
    if (!commit.company) return;
    const statistic = this.commits.get(commit.company);
    if (statistic) {
      this.#updateCommitByCompany(statistic, commit);
    } else {
      this.#addCommitByCompany(commit);
    }
  }

  #addCommitByCompany(commit: ICommit) {
    this.commits.set(commit.company, {
      company: commit.company,
      commits: 1,
      firstCommit: commit,
      lastCommit: commit,
      days: createIncrement(commit.timestamp),
      employments: createIncrement(commit.author),
      tasks: createIncrement(commit.task),
      types: createIncrement(commit.type),
      scopes: createIncrement(commit.scope),
    });
  }

  #updateCommitByCompany(statistic: any, commit: ICommit) {
    statistic.commits += 1;
    statistic.lastCommit = commit;
    statistic.days[commit.timestamp] = true;
    statistic.employments[commit.author] = true;

    increment(statistic.tasks, commit.task);
    increment(statistic.types, commit.type);
    increment(statistic.scopes, commit.scope);
  }

  updateTotalInfo(dataGripByAuthor: any) {
    console.dir(dataGripByAuthor);
    this.statistic = Array.from(this.commits.values())
      .sort((dotA: any, dotB: any) => dotB.commits - dotA.commits)
      .map((statistic: any) => {
        const tasks = Object.keys(statistic.tasks);
        const days = Object.keys(statistic.days);
        const employments = Object.keys(statistic.employments);

        let isActive = false;
        employments.forEach((name) => {
          const author = dataGripByAuthor.statisticByName[name];
          if (!author) return;
          if (author.lastCompany === statistic.company) isActive = true;
        });

        const companyInfo = {
          ...statistic,
          employments,
          tasks,
          totalTasks: tasks.length,
          totalDays: days.length,
          totalEmployments: employments.length,
          isActive,
        };
        delete companyInfo.days;

        this.statisticByName[statistic.company] = companyInfo;

        return companyInfo;
      });

    this.commits.clear();
  }
}
