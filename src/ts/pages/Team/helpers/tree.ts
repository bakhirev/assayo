import { IFolder } from 'ts/interfaces/FileInfo';

function getSubTree(tree: IFolder, path: string[]) {
  return (path || []).reduce((subTree: any, folderName: string) => {
    subTree = subTree.content[folderName] || { content: [] };
    return subTree;
  }, tree || { content: [] });
}

function getSortedContent(subTree: any) {
  return Object.values(subTree.content)
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
