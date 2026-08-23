import { ONE_DAY } from 'ts/helpers/formatter';

const WORK_HOUR_IN_DAY = 8;

function getRoundNumber(value: number): number {
  const dec =  value % 1 * 10;
  if (dec > 7) return Math.ceil(value);
  if (dec < 3) return Math.floor(value);
  return Math.floor(value) + 0.5;
}

export function getTimeOnTask(tasks: any[]) {
  const percent = tasks.map((commits) => {
    const from = commits?.[0]?.hours;
    const to = commits?.[commits?.length - 1]?.hours;
    return to - from || 1;
  });
  const total = percent.reduce((acc, cur) => acc + cur, 0);
  const scale = WORK_HOUR_IN_DAY / total;

  let sum = 0;
  const lastIndex = percent.length - 1;
  return percent.map((value, index) => {
    const hours = getRoundNumber(value * scale);
    if (index !== lastIndex) {
      sum += hours;
      return hours;
    }
    const last = WORK_HOUR_IN_DAY - sum;
    return last < 1 ? 0.5 : last;
  });
}

function getColumnsIds(days: any[]) {
  if (!days?.length) return [];
  const from = days?.[0]?.milliseconds;
  const to = days?.[days.length - 1]?.milliseconds;

  if (from === to) return [from];

  const columns = [];
  for (let i = from; i < to; i += ONE_DAY) {
    const date = new Date(i);
    const timestamp = date.toISOString().split('T').shift() || '';
    const day = date.getDay() - 1;
    columns.push({ id: timestamp, day: day < 0 ? 6 : day });
  }
  return columns;
}

export function getColumnsAndRows(days: any[], author?: string): any {
  const columns: number[] = getColumnsIds(days);
  const rows = new Map();

  days.forEach((dayInfo: any) => {
    const columnId = dayInfo.timestamp;

    Object.entries(dayInfo.tasksByAuthor).forEach(([taskAuthor, tasks]) => {
      if (author && taskAuthor !== author) return;

      const tasksCommits = Object.values(tasks as any);
      const timeOnTask = getTimeOnTask(tasksCommits);

      Object.keys(tasks as any).forEach((task, index) => {
        const refTaskDay = rows.get(task) || new Map();
        const time = (refTaskDay.get(columnId) || 0) + timeOnTask[index];
        refTaskDay.set(columnId, time);
        rows.set(task, refTaskDay);
      });
    });
  });

  return [columns, rows];
}
