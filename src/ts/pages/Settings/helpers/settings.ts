import IHashMap from 'ts/interfaces/HashMap';
import { IEmployees, IUserSetting } from 'ts/interfaces/UserSetting';

import getEmptySettings from '../helpers/getEmptySettings';

class Settings {
  customSettings: IUserSetting = getEmptySettings();

  employeesByName: IHashMap<IEmployees> = {};

  workDaysInMonth: number = 22;

  salaryInDay: number = 3000 / 22;

  update(customSettings?: IUserSetting) {
    this.customSettings = customSettings || getEmptySettings();

    this.employeesByName = this.customSettings.employees.reduce((acc, user) => {
      acc[user.name] = user;
      return acc;
    }, {});

    const salary = this.customSettings.defaultSalary;
    this.workDaysInMonth = Math.ceil(4.3 * 5); // TODO: salary.workDaysInWeek);
    this.salaryInDay = salary.value / this.workDaysInMonth;
  }

  get() {
    return this.customSettings;
  }

  getMiddleSalaryInMonth(name: string): number {
    const user = this.employeesByName[name];
    if (!user) return this.customSettings.defaultSalary.value;
    const salary = user.salary[user.salary.length - 1];
    return salary.value;
  }

  getMiddleSalaryInDay(name: string) {
    const user = this.employeesByName[name];
    if (!user) return this.salaryInDay;
    const salary = user.salary[user.salary.length - 1];
    const workDaysInMonth = Math.ceil(4.3 * 5); // TODO: * salary.workDaysInWeek);
    return salary.value / workDaysInMonth;
  }
}

const settings = new Settings();

export default settings;
