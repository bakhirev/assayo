import { makeObservable, observable, action } from 'mobx';
import ICommit from '../interfaces/Commit';
import dataGripStore from './DataGrip';

interface ISettingsStore {
  commits: ICommit[];
  defaultFrom: string;
  defaultTo: string;
  TODAY: Date;
  ONE_DAY: number;
  from: string;
  to: string;
  minCommits: number;
  isFullTime: boolean;

  defaultSalary: number;
  defaultWorkDays: number;
  holidaysInYear: number;
  currency: string;
  salary: any;
  workDays: any;

  updateByCommits: (commits: ICommit[], first: ICommit, last: ICommit) => void,
  setFilterByDateType: (type: string) => void,
}

class SettingsStore implements ISettingsStore {
  commits: ICommit[] = [];

  defaultFrom: string = '';

  defaultTo: string = '';

  TODAY: Date = new Date();

  ONE_DAY: number = 24 * 60 * 60 * 1000;

  from: string = '';

  to: string = '';

  minCommits: number = 20;

  isFullTime: boolean = true;

  defaultSalary: number = 180000;

  defaultWorkDays: number = 5;

  holidaysInYear: number = 118 + 22; // праздники + выходные + отпуск

  currency: string = 'RUB';

  salary: any = {};

  workDays: any = {};

  constructor() {
    makeObservable(this, {
      commits: observable,
      defaultFrom: observable,
      defaultTo: observable,
      TODAY: observable,
      ONE_DAY: observable,
      from: observable,
      to: observable,
      minCommits: observable,
      isFullTime: observable,

      defaultSalary: observable,
      defaultWorkDays: observable,
      holidaysInYear: observable,
      currency: observable,

      salary: observable,
      workDays: observable,

      updateByCommits: action,
      setFilterByDateType: action,
      updateProperty: action,
      setSalary: action,
    });
  }

  getMiddleSalaryInMonth(name: string): number {
    return this.salary[name] || this.defaultSalary;
  }

  getMiddleSalaryInDay(name: string) {
    const salaryInMonth = this.getMiddleSalaryInMonth(name);
    const workDaysInWeek = this.workDays[name] || this.defaultWorkDays;
    const workDaysInMonth = Math.ceil(4.3 * workDaysInWeek);
    return salaryInMonth / workDaysInMonth;
  }

  getValue(property: string) {
    return property.split('.').reduce((acc, key) => acc[key], this);
  }

  updateByCommits(commits: ICommit[], firstCommit: ICommit, lastCommit: ICommit) {
    this.commits = commits;
    this.defaultFrom = firstCommit.timestamp;
    this.defaultTo = lastCommit.timestamp;
    this.TODAY = new Date(this.defaultTo);
    this.from = this.defaultFrom;
    this.to = this.defaultTo;
    this.minCommits = 20;
  }

  setFilterByDateType(type: string) {
    const count = {
      year: 365,
      halfYear: 183,
      month: 30,
      week: 7,
      day: 1,
    }[type];

    this.from = count
      ? (new Date(this.TODAY.getTime() - this.ONE_DAY * count)).toISOString().split('T')[0]
      : this.defaultFrom;

    this.to = this.defaultTo;

    this.minCommits = {
      all: 20,
      year: 20,
      halfYear: 10,
      month: 2,
    }[type] || 1;

    dataGripStore.updateChars();
  }

  updateProperty(propertyName: string, value?: any) {
    this[propertyName] = value ?? null;
    dataGripStore.updateChars();
  }

  setSalary(userName: string, salary?: number) {
    this.salary[userName] = salary || this.defaultSalary;
  }
}

const settingsStore = new SettingsStore();

export default settingsStore;
