import { IDirtyFile, IFileTree } from 'ts/interfaces/FileInfo';
import IHashMap from 'ts/interfaces/HashMap';

export function getNewFileName(fileName: string, allFiles: any) {
  const hasRename = (/\s=>\s/gim).test(fileName);
  if (!hasRename) return fileName;

  let changedName = fileName.match(/\{[^}]+\}/gim)?.pop();
  if (!changedName) changedName = fileName;

  const [oldName, newName] = changedName
    ? changedName.replace(/[{}]/gim, '').split(' => ')
    : fileName.split(' => ');

  let oldPath = fileName.replace(changedName, oldName);
  if (!oldName) oldPath = oldPath.replace('//', '/');

  const newPath = fileName.replace(changedName, newName);
  if (!allFiles[oldPath]) return newPath;

  allFiles[newPath] = allFiles[oldPath];
  allFiles[newPath].name = newPath;

  return newPath;
}

function getFolder(name?: string): IFileTree {
  return {
    id: Math.random(),
    name: name || '',
    content: {},
  };
}

function getFolderTree(fileTree: any, file: IDirtyFile) {
  let prev = fileTree;
  let fileName: string = file.path.pop() || '';
  file.path.forEach((folder: any) => {
    if (!prev[folder] || !prev[folder].content) {
      prev[folder] = getFolder(folder);
    }
    prev = prev[folder].content;
  });
  prev[fileName] = file;
}


export function getFileList(allFiles: IHashMap<IDirtyFile>) {
  const fileList = Object.values(allFiles);
  const fileTree: IFileTree = getFolder();

  fileList.forEach((file: IDirtyFile) => {
    if (!file.name) return;
    file.path = file.name.split('/');
    getFolderTree(fileTree.content, file);
  });

  return { fileList, fileTree };
}
