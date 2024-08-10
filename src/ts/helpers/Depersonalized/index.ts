import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';

import {
  FAKE_AUTHORS,
  FAKE_EMAILS,
  FAKE_TASK_PREFIXES,
} from './constants';
import FakeName from './FakeName';

export default class Depersonalized {
  fakeName: any = null;

  fakeEmail: any = null;

  fakeTaskPrefix: any = null;

  constructor() {
    this.fakeName = new FakeName(FAKE_AUTHORS);
    this.fakeEmail = new FakeName(FAKE_EMAILS);
    this.fakeTaskPrefix = new FakeName(FAKE_TASK_PREFIXES);
  }

  getCommit(commit: ICommit | ISystemCommit): ICommit | ISystemCommit {
    const author = this.fakeName.get(commit.author);
    const email = this.fakeEmail.get(commit.author);

    if (!commit.task) {
      return {
        ...commit,
        author,
        email,
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
      branch,
      toBranch,
    };
  }
}
