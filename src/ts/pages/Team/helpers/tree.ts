import { IFileTree } from 'ts/interfaces/FileInfo';

interface IFile {
  name: string;
  path: string[];
  content: IFile[];
}

export function getSubTreeByPath(tree: IFileTree, path: string[]) {
  let subTree: any = tree || { content: [] };
  (path || []).forEach((folderName: string) => {
    subTree = subTree.content[folderName] || { content: [] };
  });
  return subTree;
}


function getButtonUp(file: IFile) {
  return file?.path?.length ? ({
    title: '..',
    path: file.path.slice(0, -1),
  }) : null;
}

function getFolderView(file: IFile) {
  return {
    file,
    title: `📁 ${file.name}`,
    path: file.path,
  };
}

function getFileView(file: IFile) {
  return {
    file,
    title: `📄 ${file.name.split('/').pop() || ''}`,
  };
}

export function getArrayFromTree(tree: any) {
  const folders = [];
  const files = [];

  for (let name in tree.content) {
    const file = tree.content[name];
    if (file.content) {
      folders.push(getFolderView(file));
    } else {
      files.push(getFileView(file));
    }
  }

  return [
    getButtonUp(tree),
    ...folders,
    ...files,
  ].filter(v => v);
}