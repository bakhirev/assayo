import ICommit, { IFileChange } from 'ts/interfaces/Commit';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

function getNameTypeExtension(path?: string) {
  const name = (path || '')?.split('/')?.pop() || '';
  const parts = name.split('.') || [];
  const extension = parts[parts.length - 1] || '';
  const type = parts.length > 2 ? parts[parts.length - 2] : '';
  return { name, type, extension };
}

export default class FileBuilderCommon {
  static getProps(fileChange: IFileChange, commit: ICommit) {
    return {
      path: fileChange.path,
      action: fileChange.action,
      firstCommit: commit,
      lastCommit: commit,
    };
  }

  static updateProps(file: IDirtyFile, fileChange: IFileChange, commit: ICommit) {
    file.action = fileChange.action;
    file.lastCommit = commit;
  }

  static updateTotal(file: IDirtyFile) {
    if (Array.isArray(file?.path)) return;
    // @ts-ignore
    const { name, type, extension } = getNameTypeExtension(file?.path);
    file.name = name;
    file.type = type;
    file.extension = extension;

    // @ts-ignore
    const parts = file.path.split('/');
    parts.pop();
    file.pathString = file.path;
    file.path = parts;
  }
}
