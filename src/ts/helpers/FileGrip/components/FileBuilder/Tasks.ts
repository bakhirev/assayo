import ICommit from 'ts/interfaces/Commit';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

export default class FileBuilderTasks {
  static getProps(commit: ICommit) {
    return {
      tasks: new Set([commit.task]),
      timestamp: new Set([commit.timestamp]),
      totalTasks: 0,
      totalDays: 0,
    };
  }

  static updateProps(file: IDirtyFile, commit: ICommit) {
    file.tasks.add(commit.task);
    file.timestamp.add(commit.timestamp);
  }

  static updateTotal(file: IDirtyFile) {
    file.totalTasks = file.tasks.size;
    file.totalDays = file.timestamp.size;
  }
}
