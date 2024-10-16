import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import { ONE_DAY } from 'ts/helpers/formatter';

export default class DataGripByCompany {
  companies: HashMap<any> = new Map();

  statistic: any = [];

  statisticByName: IHashMap<any> = {};

  clear() {
    this.companies.clear();
    this.statistic = [];
    this.statisticByName = {};
  }

  #addAuthor(statByAuthor: any) {
    const company = statByAuthor.company[statByAuthor.company.length - 1]?.title;
    if (!company) return;
    const statistic = this.companies.get(company);
    if (statistic) {
      this.#updateCommitByCompany(statistic, statByAuthor);
    } else {
      this.#addCommitByCompany(company, statByAuthor);
    }
  }

  #addCommitByCompany(company: string, statByAuthor: any) {
    this.companies.set(company, {
      company,
      isActive: !statByAuthor.isDismissed && !statByAuthor.isStaff,
      commits: statByAuthor.commits,
      from: statByAuthor.firstCommit.milliseconds,
      to: statByAuthor.lastCommit.milliseconds,
      daysWorked: statByAuthor.daysWorked,
      employments: [statByAuthor.author],
      tasks: [statByAuthor.tasks],
      // types: statByAuthor.types,
      // scopes: createIncrement(commit.scope),
    });
  }

  #updateCommitByCompany(statistic: any, statByAuthor: any) {
    if (!statistic.isActive) {
      statistic.isActive = !statByAuthor.isDismissed && !statByAuthor.isStaff;
    }
    statistic.commits += statByAuthor.commits;
    statistic.from = statistic.from > statByAuthor.firstCommit.milliseconds
      ? statByAuthor.firstCommit.milliseconds
      : statistic.from;
    statistic.to = statistic.to < statByAuthor.lastCommit.milliseconds
      ? statByAuthor.lastCommit.milliseconds
      : statistic.to;
    statistic.daysWorked += statByAuthor.daysWorked;
    statistic.employments.push(statByAuthor.author);
    statistic.tasks.push(statByAuthor.tasks);
  }

  updateTotalInfo(dataGripByAuthor: any) {
    dataGripByAuthor.statistic.forEach((data: any) => {
      this.#addAuthor(data);
    });

    this.statistic =  Array.from(this.companies.values())
      .map((company: any) => {
        company.tasks = Array.from(new Set(company.tasks.flat(1))).length;
        company.totalDays = Math.max(((company.to - company.from) / ONE_DAY), 1);

        this.statisticByName[company.company] = company;

        return company;
      });

    this.companies.clear();
  }
}
