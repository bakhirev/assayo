import ICommit from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import { ONE_DAY } from 'ts/helpers/formatter';
import { WeightedAverage } from 'ts/helpers/Math';
import applicationConfig from 'ts/store/ApplicationConfig';

import MinMaxCounter from '../../helpers/MinMaxCounter';

import {
  getDaysBetween,
  createUniqValues,
  incrementUniqValues,
  createMap,
  incrementMap,
} from '../../helpers';

import {
  getTotalDaysWithoutCommits,
  getIsStaff,
  getListByType,
  sortFunc,
} from './helpers';
import StatisticsByHour from './byHour';
import StatisticsByTasks from './byTask';
import StatisticsByCompany from './byCompany';

export default class StatisticsByAuthor {
  list: string[] = [];

  employment: IHashMap<string[]> = {};

  commits: HashMap<any> = new Map();

  totalInfo: any = [];

  totalInfoByName: HashMap<any> = new Map();

  clear() {
    this.list = [];
    this.commits.clear();
    this.totalInfo = [];
    this.totalInfoByName.clear();
  }

  addCommit(commit: ICommit) {
    const statistic = this.commits.get(commit.author);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #addNewCommit(commit: ICommit) {
    const isWeekend = !applicationConfig.config?.workDays?.[commit.day - 1];
    const messageLength = commit.text.length || 0;

    this.commits.set(commit.author, {
      author: commit.author,
      commits: 1,
      firstCommit: commit.milliseconds,
      lastCommit: commit.milliseconds,
      firstCommitTimestamp: commit.timestamp,
      lastCommitTimestamp: commit.timestamp,
      lastCommitTimezone: commit.timezone,

      days: createUniqValues(isWeekend ? undefined : commit.timestamp),
      weekends: createUniqValues(isWeekend ? commit.timestamp : undefined),
      tasks: new StatisticsByTasks(commit),
      types: createMap(commit.type),
      hour: new StatisticsByHour(commit),

      scopes: createUniqValues(commit.scope),
      emails: createUniqValues(commit.email),
      device: commit.device,
      company: new StatisticsByCompany(commit),
      country: commit.country
        ? [{ title: commit.country, from: commit.milliseconds, fromTimestamp: commit.timestamp, fromTimezone: commit.timezone }]
        : [],
      lastCountry: commit.country,

      maxMessageLength: new MinMaxCounter(messageLength),
      middleMessageLength: new WeightedAverage(messageLength),
    });
  }

  #updateCommit(statistic: any, commit: ICommit) {
    statistic.commits += 1;
    statistic.lastCommit = commit.milliseconds;
    statistic.lastCommitTimestamp = commit.timestamp;
    statistic.lastCommitTimezone = commit.timezone;


    const isWeekend = !applicationConfig.config?.workDays?.[commit.day - 1];
    if (isWeekend) {
      incrementUniqValues(statistic.weekends, commit.timestamp);
    } else {
      incrementUniqValues(statistic.days, commit.timestamp);
    }
    statistic.tasks.addCommit(commit);
    incrementMap(statistic.types, commit.type);
    statistic.hour.addCommit(commit);

    incrementUniqValues(statistic.scopes, commit.scope);
    incrementUniqValues(statistic.emails, commit.email);
    statistic.device = commit.device || statistic.device;
    statistic.company.addCommit(commit);
    if (commit.country && statistic.lastCountry !== commit.country) {
      statistic.country.push({ title: commit.country, from: commit.milliseconds, fromTimestamp: commit.timestamp, fromTimezone: commit.timezone });
      statistic.lastCountry = commit.country;
    }

    const messageLength = commit.text.length || 0;
    statistic.maxMessageLength.update(messageLength);
    statistic.middleMessageLength.update(messageLength);
  }

  updateTotalInfo(lastCommit: ICommit) {
    const dismissedLimit = lastCommit?.milliseconds - 32 * ONE_DAY;
    const middleSalaryInMonth = applicationConfig.getMiddleSalaryInMonth();
    const middleSalaryInDay = applicationConfig.getMiddleSalaryInDay();

    this.totalInfo = Array.from(this.commits.values())
      .map((item: any) => {
        const totalWeekendsDaysWithCommits = item.weekends.size;
        const totalDaysWithCommits = item.days.size + totalWeekendsDaysWithCommits;
        const totalDays = getDaysBetween(item.firstCommit, item.lastCommit);
        const totalDaysWithoutCommits = getTotalDaysWithoutCommits(totalDaysWithCommits, totalDays);

        const isStaff = getIsStaff(totalDaysWithCommits, totalDaysWithoutCommits, totalDays, item.author);
        const isDismissed = item.lastCommit < dismissedLimit;

        const companies = item.company.getTotalInfo();
        const lastCompany = companies[companies?.length - 1]?.title || '';

        let totalMoneyInWeekend = totalWeekendsDaysWithCommits * middleSalaryInDay * 2;
        let totalMoney = Math.ceil(totalDays / 30) * middleSalaryInMonth + totalMoneyInWeekend;
        let totalMoneyWorked = totalDaysWithCommits * middleSalaryInDay;
        let totalMoneyLosses = totalDaysWithoutCommits * middleSalaryInDay;
        if (isStaff) {
          totalMoneyInWeekend = 0;
          totalMoney = 0;
          totalMoneyWorked = 0;
          totalMoneyLosses = 0;
        }

        const [
          commitsByDayAndHour,
          commitsByHour,
        ] = item.hour.getTotalInfo();

        const {
          totalTasks,
          totalTaskInDay,
          totalTaskInChanges,
          totalTaskInCommits,
          totalTaskInFiles,
        } = item.tasks.getTotalInfo(totalDaysWithCommits);

        const data = {
          author: item.author,

          commits: item.commits,
          commitsByDayAndHour,
          commitsByHour,

          firstCommit: item.firstCommit,
          firstCommitTimestamp: item.firstCommitTimestamp,
          lastCommit: item.lastCommit,
          lastCommitTimestamp: item.lastCommitTimestamp,
          lastCommitTimezone: item.lastCommitTimezone,
          lastCompany,
          lastCountry: item.lastCountry,

          totalDays,
          totalDaysWithCommits,
          totalWeekendsDaysWithCommits: item.weekends.size,
          totalDaysWithoutCommits,

          emails: Array.from(item.emails),
          device: item.device,
          countries: item.country,
          companies,

          totalScopes: item.scopes.size,
          totalTasks,
          totalTaskInDay,
          totalTaskInChanges,
          totalTaskInCommits,
          totalTaskInFiles,
          types: Object.fromEntries(item.types.entries()),

          isStaff,
          isDismissed,

          totalMoney,
          totalMoneyWorked,
          totalMoneyLosses,
          totalMoneyInWeekend,

          middleMessageLength: item.middleMessageLength.get(),
          maxMessageLength: item.maxMessageLength.max,
          wordStatistics: [],
        };
        this.totalInfoByName.set(item.author, data);
        return data;
      })
      .sort(sortFunc);

    const [active, dismissed, staff] = getListByType(this.totalInfo);
    this.employment = { active, dismissed, staff };
    this.list = [ ...active, ...dismissed, ...staff ];

    this.commits.clear();
  }
}
