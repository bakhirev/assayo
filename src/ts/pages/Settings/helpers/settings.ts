import IHashMap from 'ts/interfaces/HashMap';

import { IEmployees, ISetting } from '../interfaces/Setting';
import getEmptySettings from '../helpers/getEmptySettings';

class Settings {
  customSettings: ISetting = getEmptySettings();

  employeesByName: IHashMap<IEmployees> = {};

  workDaysInMonth: number = 22;

  salaryInDay: number = 180000 / 22;

  update(customSettings?: ISetting) {
    this.customSettings = customSettings || getEmptySettings();

    this.employeesByName = this.customSettings.employees.reduce((acc, user) => {
      acc[user.name] = user;
      return acc;
    }, {});

    const salary = this.customSettings.defaultSalary;
    this.workDaysInMonth = Math.ceil(4.3 * salary.workDaysInWeek);
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
    const workDaysInMonth = Math.ceil(4.3 * salary.workDaysInWeek);
    return salary.value / workDaysInMonth;
  }
}

const settings = new Settings();

export default settings;
