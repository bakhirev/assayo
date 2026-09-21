import IHashMap from 'ts/interfaces/HashMap';

import { AuthorCompany } from './byCompany';

export interface AuthorCountry {
  title: string;
  from: number;
  fromTimestamp: string;
  fromTimezone: string;
}

export interface StatisticsAuthor {
  author: string;
  commits: number;
  commitsByDayAndHour: number[][];
  commitsByHour: number[];
  firstCommit: number;
  firstCommitTimestamp: string;
  lastCommit: number;
  lastCommitTimestamp: string;
  lastCommitTimezone: string;
  lastCompany: string;
  lastCountry: string;
  totalDays: number;
  totalDaysWithCommits: number;
  totalWeekendsDaysWithCommits: number;
  totalDaysWithoutCommits: number;
  emails: string[];
  device: string;
  countries: AuthorCountry[] | null;
  companies: AuthorCompany[];
  totalScopes: number;
  totalTasks: number;
  totalTaskInDay: number;
  totalTaskInChanges: number;
  totalTaskInCommits: number;
  totalTaskInFiles: number;
  types: IHashMap<number>;
  isStaff: boolean;
  isDismissed: boolean;
  totalMoney: number;
  totalMoneyWorked: number;
  totalMoneyLosses: number;
  totalMoneyInWeekend: number;
  middleMessageLength: number;
  maxMessageLength: number;
}
