const WORK_DAYS_IN_YEAR = 247; // рабочии дни
const HOLIDAYS = 365 - WORK_DAYS_IN_YEAR; // праздники + выходные + отпуск
const WORKED_BY_DAYS = HOLIDAYS / WORK_DAYS_IN_YEAR;
export function getTotalDaysWithoutCommits(totalDaysWithCommits: number, totalDaysInProject: number) {
  const totalDaysWorkedAwait = Math.floor(totalDaysInProject * WORKED_BY_DAYS);
  const totalDaysWithoutCommits = totalDaysWorkedAwait - totalDaysWithCommits + 1;
  return totalDaysWithoutCommits > 0 ? totalDaysWithoutCommits : 0;
}

export function getIsStaff(
  totalDaysWithCommits: number,
  totalDaysWithoutCommits: number,
  totalDays: number,
  name: string,
) {
  const percentWork = totalDaysWithCommits * 100 / (totalDaysWithCommits + totalDaysWithoutCommits);
  const isBot = (/[^a-z]bot[^a-z]/gim).test(name);
  return totalDays < 20 || percentWork < 15 || isBot;
}

export function getListByType(list: any[]) {
  const types: any = [[], [], []];
  list.forEach((item) => {
    if (item.isStaff) types[2].push(item.author);
    else if (item.isDismissed) types[1].push(item.author);
    else types[0].push(item.author);
  });
  return types;
}

export function sortFunc(dotA: any, dotB: any) {
  const typeA = (dotA.isStaff ? 10 : 0) + (dotA.isDismissed ? 5 : 0);
  const typeB = (dotB.isStaff ? 10 : 0) + (dotB.isDismissed ? 5 : 0);
  const type = typeA - typeB;
  if (type) return type;

  let value = dotB.totalTasks - dotA.totalTasks;
  if (value) return value;

  value = dotB.commits - dotA.commits;
  if (value) return value;

  return dotB.lastCommit - dotA.lastCommit;
}
