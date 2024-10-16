import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';

import {
  FAKE_AUTHORS,
  FAKE_EMAILS,
  FAKE_TASK_PREFIXES,
  FAKE_COMPANIES,
} from './constants';
import FakeName from './FakeName';

export default class Depersonalized {
  fakeName: any = null;

  fakeEmail: any = null;

  fakeTaskPrefix: any = null;

  fakeCompany: any = null;

  constructor() {
    this.fakeName = new FakeName('User', FAKE_AUTHORS);
    this.fakeEmail = new FakeName('user', FAKE_EMAILS);
    this.fakeTaskPrefix = new FakeName('JIRA', FAKE_TASK_PREFIXES);
    this.fakeCompany = new FakeName('Company', FAKE_COMPANIES);
  }

  getCommit(commit: ICommit | ISystemCommit): ICommit | ISystemCommit {
    const author = this.fakeName.get(commit.author);
    const email = this.fakeEmail.get(commit.author);
    const company = this.fakeCompany.get(commit.company);

    if (!commit.task) {
      return {
        ...commit,
        author,
        email,
        company,
      };
    }

    const taskPrefix = commit.task.split(/[-_\s:#=]+/gim).shift() || '';
    const newTaskPrefix = this.fakeTaskPrefix.get(taskPrefix);
    const task = commit.task.replace(taskPrefix, newTaskPrefix);
    const message = commit.message.replace(taskPrefix, newTaskPrefix);

    // @ts-ignore
    const branch = commit.branch // @ts-ignore
      ? commit.branch.replace(taskPrefix, newTaskPrefix)
      : undefined;

    // @ts-ignore
    const toBranch = commit.toBranch// @ts-ignore
      ? commit.toBranch.replace(taskPrefix, newTaskPrefix)
      : undefined;

    return {
      ...commit,
      task,
      message,
      author,
      email,
      company,
      branch,
      toBranch,
    };
  }
}
