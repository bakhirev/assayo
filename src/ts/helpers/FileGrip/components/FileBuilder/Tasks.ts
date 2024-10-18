import ICommit from 'ts/interfaces/Commit';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

export default class FileBuilderTasks {
  static setProps(file: any, commit: ICommit) {
    file.tasks = [commit.task];
    file.timestamp = [commit.timestamp];
    file.totalTasks = 0;
    file.totalDays = 0;
  }

  static updateProps(file: IDirtyFile, commit: ICommit) {
    file.tasks.push(commit.task);
    file.timestamp.push(commit.timestamp);
  }

  static updateTotal(file: IDirtyFile) {
    file.tasks = Array.from(new Set(file.tasks));
    file.timestamp = Array.from(new Set(file.timestamp));
    file.totalTasks = file.tasks.length;
    file.totalDays = file.timestamp.length;
  }
}
