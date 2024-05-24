import { IUserSetting, IEmployees, IEmployeesSalary } from 'ts/interfaces/UserSetting';
import ICommit from 'ts/interfaces/Commit';
import localization from 'ts/helpers/Localization';

let DEFAULT_VALUES: any = {};

export function setDefaultValues(firstCommit: ICommit, lastCommit: ICommit) {
  DEFAULT_VALUES = {
    from: firstCommit.timestamp,
    to: lastCommit.timestamp,
  };
}

export function getNewEmploymentContract(settings: IUserSetting): IEmployeesSalary {
  return {
    id: Math.random(),
    value: settings.defaultSalary.value,
    currency: settings.defaultSalary.currency,
    workDaysInYear: settings.defaultSalary.workDaysInYear,
    vacationDaysInYear: settings.defaultSalary.vacationDaysInYear,
    workDaysInWeek: [...settings.defaultSalary.workDaysInWeek],
    from: DEFAULT_VALUES.from,
    type: 'full',
  };
}

export function getNewEmployeesSettings(
  name: string,
  settings: IUserSetting,
  order: number,
): IEmployees {
  return {
    id: Math.random(),
    name,
    order,
    salary: [
      getNewEmploymentContract(settings),
    ],
  };
}

export default function getEmptySettings(): IUserSetting {
  const currency = {
    ru: 'RUB',
    en: 'USD',
  }[localization.language || ''] || 'EUR';

  const value = 3000;

  return {
    version: 2,
    defaultSalary: {
      value,
      currency,
      workDaysInYear: 247,
      vacationDaysInYear: 28,
      workDaysInWeek: [1, 1, 1, 1, 1, 0, 0],
      type: 'full',
    },
    linksPrefix: {
      task: 'https://jira.com/secure/RapidBoard.jspa?task=',
      pr: 'https://bitbucket.com/projects/assayo/repos/frontend/pull-requests/',
    },
    employees: [],
  };
}
