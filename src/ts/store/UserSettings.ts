import { makeObservable, observable, action } from 'mobx';

import settingsApi from 'ts/api/settings';

import { IEmployees, IEmployeesSalary, IUserSetting } from '../interfaces/UserSetting';

interface IUserSettingsStore {
  settings: any;
  loadUserSettings: () => void,
}

function getWithMilliseconds(userSetting: IUserSetting) {
  return {
    ...userSetting,
    employees: userSetting.employees.map((employee: IEmployees) => ({
      ...employee,
      salary: employee?.salary?.map((contract: IEmployeesSalary) => ({
        ...contract,
        milliseconds: (new Date(contract.from)).getTime(),
      })),
    })),
  };
}

class UserSettings implements IUserSettingsStore {
  settings: any = {};

  constructor() {
    makeObservable(this, {
      settings: observable,
      loadUserSettings: action,
    });
  }

  loadUserSettings() {
    return settingsApi.loadSettings().then((response) => {
      this.settings = getWithMilliseconds(response);
    });
  }

  // TODO: перенести?
  getUserByName(name: string) {
    return this.settings.employees
      .find((employee: IEmployees) => employee.name === name);
  }

  getEmploymentContract(name: string, milliseconds?: number) {
    const user = this.getUserByName(name);
    const length = user?.salary?.length;

    if (!user || !length) {
      return this.settings.defaultSalary;
    }

    let actualContract = user.salary[length - 1];
    if (!milliseconds) return actualContract;

    user.salary.forEach((сontract: IEmployeesSalary) => {
      // @ts-ignore
      if (сontract.milliseconds >= milliseconds) return;
      actualContract = сontract;
    });

    return actualContract;
  }

  getCurrentSalaryInMonth(name: string) {
    return this.getEmploymentContract(name).value;
  }

  getMiddleSalaryInMonth(
    name: string,
    firstCommitTime: number,
    lastCommitTime: number,
  ) {
    const user = this.getUserByName(name);
    const length = user?.salary?.length;

    if (!user || !length) {
      return this.settings.defaultSalary.value;
    }

    const axis = (firstCommitTime - lastCommitTime);
    let prevContract = this.settings.defaultSalary;
    let dx = 0;
    let total = 0;

    for (let i = 0; i < length; i++) {
      const contract = user.salary[i];
      const minTime = prevContract.milliseconds || firstCommitTime;
      const position = (contract.milliseconds || minTime) - minTime;
      const percentForPrev = position / axis;
      const prevPeriodSalary = percentForPrev * prevContract.value;
      dx += percentForPrev;
      prevContract = contract;
      total += prevPeriodSalary;
    }

    total += (1 - dx) * prevContract.value;

    return total;
  }
}

const userSettings = new UserSettings();

export default userSettings;
