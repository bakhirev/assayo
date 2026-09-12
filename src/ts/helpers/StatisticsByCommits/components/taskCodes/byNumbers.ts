import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import { createUniqValues, incrementUniqValues } from '../../helpers';
import StatisticsByAuthor from '../author';

function getTasksInBacklog(min: number, max: number, allTaskNumbers: Set<number>) {
  let tasksInBacklog = 0;
  for (let taskNumber = min; taskNumber < max; taskNumber++) {
    tasksInBacklog += allTaskNumbers.has(taskNumber) ? 1 : 0;
  }
  return tasksInBacklog;
}

function getNotProgrammistBySize(programmist: number, limit: number) {
  if (programmist < (limit / 2) || programmist < 3) return 0;
  return Math.ceil(programmist / limit);
}

export interface TaskCodeMonth {
  month: number;
  year: number;
  max: number;
  min?: number;
  tasks: Set<string | number>;
  authors: Set<string | number>;
}

export interface TaskCodeDepartment {
  month: number;
  year: number;
  newTaskInMonth: number;
  tasksFixedThisGroup: number;
  tasksInBacklog: number;
  tasksForThisGroup: number;
  tasksPerUser: number;
  programmistInThisGroup: number;
  allProgrammistInDepartment: number;
  allUsersInDepartment: number;
  allMiddleUsersInDepartment: number;
}

export default class StatisticsByTaskNumbers {
  commits: HashMap<TaskCodeMonth> = new Map();

  constructor(commit: ICommit) {
    this.addCommit(commit);
  }

  addCommit(commit: ICommit) {
    if (!commit.taskCode || !commit.week) return;
    const statistic = this.commits.get(`${commit.year}-${commit.month}`);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: TaskCodeMonth, commit: ICommit) {
    if (statistic.max < commit.taskNumber) statistic.max = commit.taskNumber;
    incrementUniqValues(statistic.tasks, commit.taskNumber);
    incrementUniqValues(statistic.authors, commit.author);
  }

  #addNewCommit(commit: ICommit) {
    this.commits.set(`${commit.year}-${commit.month}`, {
      month: commit.month,
      year: commit.year,
      max: commit.taskNumber,
      tasks: createUniqValues(commit.taskNumber),
      authors: createUniqValues(commit.author),
    });
  }

  getTotalInfo(statisticsByAuthor: StatisticsByAuthor, allTaskNumbers: Set<number>) {
    const months = Array.from(this.commits.values());
    const departmentInfo: TaskCodeDepartment[] = [];

    months.forEach((month: TaskCodeMonth, i) => {
      if (!i) return;
      const prev = months[i - 1];
      month.min = prev.max + 1;

      const newTaskInMonth = month.max - month.min;
      const tasksFixedThisGroup = month.tasks.size;
      const programmistInCommits = Array.from(month.authors.values()) as string[];
      const programmistInThisGroup = programmistInCommits
        .filter((name) => !statisticsByAuthor.totalInfoByName.get(name)?.isStaff)
        .length;

      if (newTaskInMonth < 10
        || tasksFixedThisGroup < 4
        || programmistInThisGroup < 1) return;

      const tasksInBacklog = getTasksInBacklog(month.min, month.max, allTaskNumbers);
      const tasksForThisGroup = tasksInBacklog + tasksFixedThisGroup;
      const tasksPerUser = Math.ceil(tasksForThisGroup / programmistInThisGroup);
      const allProgrammistInDepartment = Math.ceil(newTaskInMonth / tasksPerUser);
      const managers =
        getNotProgrammistBySize(allProgrammistInDepartment, 5)
        + getNotProgrammistBySize(allProgrammistInDepartment, 4)
        + getNotProgrammistBySize(allProgrammistInDepartment, 7);
      const allUsersInDepartment = allProgrammistInDepartment + managers;

      departmentInfo.push({
        month: month.month,
        year: month.year,
        newTaskInMonth,
        tasksFixedThisGroup,
        tasksInBacklog,
        tasksForThisGroup,
        tasksPerUser,
        programmistInThisGroup,
        allProgrammistInDepartment,
        allUsersInDepartment,
        allMiddleUsersInDepartment: allUsersInDepartment,
      });
    });

    const withoutPeaks = this.#getWithoutPeaks(departmentInfo);
    const middleValues = this.#getMiddleValues(withoutPeaks);

    return departmentInfo.length > 3
      ? middleValues.reverse()
      : [];
  }

  #getWithoutPeaks(list: TaskCodeDepartment[]) {
    const withoutPeaks: TaskCodeDepartment[] = [];
    for (let i = 0; i < list.length; i++) {
      if (!i) continue;
      const item = list[i];
      const prev = list[i - 1];
      if (item.newTaskInMonth > (prev.newTaskInMonth * 4)) continue;
      withoutPeaks.push(item);
    }
    return withoutPeaks;
  }

  #getMiddleValues(list: TaskCodeDepartment[]) {
    list.forEach((info: TaskCodeDepartment, i: number) => {
      const prev = list[i - 1];
      if (!prev) return;
      const next = list[i + 1];
      if (!next) return;
      info.allMiddleUsersInDepartment = Math.floor(
        ((prev.allUsersInDepartment + info.allUsersInDepartment + next.allUsersInDepartment) / 3),
      );
    });
    list.pop();
    return list;
  }
}
