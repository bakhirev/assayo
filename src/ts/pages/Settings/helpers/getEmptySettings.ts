import { ISetting, IEmployees, IEmployeesSalary } from '../interfaces/Setting';
import ICommit from 'ts/interfaces/Commit';

let DEFAULT_VALUES: any = {};
export function setDefaultValues(firstCommit: ICommit, lastCommit: ICommit) {
  DEFAULT_VALUES = {
    minCommits: 20,
    from: firstCommit.timestamp,
    to: lastCommit.timestamp,
  };
}

export function getNewSalarySettings(settings: ISetting): IEmployeesSalary {
  return {
    id: Math.random(),
    value: settings.defaultSalary.value,
    currency: settings.defaultSalary.currency,
    workDaysInYear: settings.defaultSalary.workDaysInYear,
    vacationDaysInYear: settings.defaultSalary.vacationDaysInYear,
    workDaysInWeek: settings.defaultSalary.workDaysInWeek,
    from: settings.defaultFilters.from,
  };
}

export function getNewEmployeesSettings(
  name: string,
  settings: ISetting,
  order: number,
): IEmployees {
  return {
    id: Math.random(),
    name,
    order,
    salary: [
      getNewSalarySettings(settings),
    ],
  };
}

export default function getEmptySettings(): ISetting {
  return {
    defaultFilters: { ...DEFAULT_VALUES },
    filters: { ...DEFAULT_VALUES },
    defaultSalary: {
      value: 180000,
      currency: 'RUB',
      workDaysInYear: 247,
      vacationDaysInYear: 28,
      workDaysInWeek: 5,
      type: 'full',
    },
    linksPrefixForTasks: '',
    employees: [],
  };
}
