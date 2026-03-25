import { makeObservable, observable, action } from 'mobx';

import IApplicationConfig from 'ts/interfaces/ApplicationConfig';

const daysInMonth = 30;
const daysInWeek = 7;

class ApplicationConfig {
  config: IApplicationConfig = {} as IApplicationConfig;

  workDaysInMonth: number = 22;

  constructor() {
    makeObservable(this, {
      config: observable,
      updateConfig: action,
      updateConfigProperty: action,
    });
  }

  updateConfig(config: IApplicationConfig) {
    this.config = config;
    const workDays = this.config.workDays.filter(Boolean).length;
    this.workDaysInMonth = Math.ceil(daysInMonth / daysInWeek * workDays);
  }

  updateConfigProperty(property: string, value: any) {
    this.updateConfig({
      ...this.config,
      [property]: value,
    });
  }

  getMiddleSalaryInMonth() {
    return this.config.middleSalaryInMonth;
  }

  getMiddleSalaryInDay() {
    return this.getMiddleSalaryInMonth() / this.workDaysInMonth;
  }

  getMiddleVacationPayInDay() {
    return this.getMiddleSalaryInMonth() / daysInMonth;
  }
}

const applicationConfig = new ApplicationConfig();

export default applicationConfig;
