export default interface IWorkDay {
  month: number;
  year: number;
  day: number;
  dayInMonth: number;
  tasksInDay: number;
  timestamp: string;
  commits: number;
}