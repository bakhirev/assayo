import { IFolder } from 'ts/interfaces/FileInfo';

function getSubTree(tree: IFolder, path: string[]) {
  return (path || [])
    .reduce((subTree: any, folderName: string) => {
      subTree = subTree.content.get(folderName) || { content: new Map() };
      return subTree;
    }, tree || { content: new Map() });
}

function getSortedContent(subTree: IFolder) {
  return Array.from(subTree.content.values())
    .sort((a: any, b: any) => {
      if (a.content && !b.content) return -1;
      if (!a.content && b.content) return 1;
      if (a.name === b.name) return 0;
      return a.name > b.name ? 1 : -1;
    });
}

export function getContentByPath(fileTree: IFolder, path: string[]) {
  return getSortedContent(getSubTree(fileTree, path));
}
