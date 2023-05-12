export default interface ICommit {
  // date
  date: string; // "2021-02-09T12:59:17+03:00",
  day: number; // 1,
  dayInMonth: number; // 9,
  hours: number; // 12,
  minutes: number; // 59,
  month: number; // 1,
  year: number; // 2021,
  timestamp: string; //  2021-02-09",
  milliseconds: number; //  1612828800000,
  week: number; //  42,

  // user
  author: string; // "Frolov Ivan",
  email: string; // "frolov@mail.ru",

  // task
  message: string; // "JIRA-0000 fix(profile): add new avatar",
  task: string; // "JIRA-0000,
  type: string; // feat|fix|docs|style|refactor|test|chore
  scope: string; //  table, sale, profile and etc.

  // files
  changes: number; // 0,
  added: number; // 0,
  removed: number; // 0
}
