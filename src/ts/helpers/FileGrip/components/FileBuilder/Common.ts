import ICommit, { IFileChange } from 'ts/interfaces/Commit';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

function getNameTypeExtension(name: string) {
  const extensionIndex = name.lastIndexOf('.');
  const extension = name.substring(extensionIndex + 1);
  const shortName = name.substring(0, extensionIndex);
  const typeIndex = shortName.lastIndexOf('.');
  const type = typeIndex !== -1
    ? shortName.substring(typeIndex + 1)
    : '';
  return { type, extension };
}

export default class FileBuilderCommon {
  static setProps(file: any, fileChange: IFileChange, commit: ICommit) {
    file.name = '';
    file.path = fileChange.path;
    file.action = fileChange.action;
    file.firstCommit = commit;
    file.lastCommit = commit;
  }

  static updateProps(file: IDirtyFile, fileChange: IFileChange, commit: ICommit) {
    file.action = fileChange.action;
    file.lastCommit = commit;
  }

  static updateTotal(file: IDirtyFile) {
    if (Array.isArray(file?.path)) return;
    // @ts-ignore
    const parts = file.path.split('/');
    const name = parts.pop() || '';

    const typeExtension = getNameTypeExtension(name);
    file.name = name;
    file.type = typeExtension.type;
    file.extension = typeExtension.extension;

    file.pathString = file.path;
    file.path = parts;
  }
}
