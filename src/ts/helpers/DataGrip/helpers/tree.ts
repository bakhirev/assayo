function addTotalInfo(folder: any) {
  folder.total = { added: 0, changes: 0, removed: 0, commits: 0 };
  const authors = Object.keys(folder.authors);
  authors.forEach(author => {
    folder.total.added += folder.authors[author].added;
    folder.total.changes += folder.authors[author].changes;
    folder.total.removed += folder.authors[author].removed;
    folder.total.commits += folder.authors[author].commits;
  });
  authors.forEach(author => {
    const authorInfo = folder.authors[author];
    authorInfo.addedPercent = Math.round(authorInfo.added * 100 / folder.total.added);
    authorInfo.changesPercent = Math.round(authorInfo.changes * 100 / folder.total.changes);
    authorInfo.removedPercent = Math.round(authorInfo.removed * 100 / folder.total.removed);
    authorInfo.commitsPercent = Math.round(authorInfo.commits * 100 / folder.total.commits);
  });
}

function addInfoFromFile(folderInfo: any, file: any) {
  folderInfo.lines += file.lines;
  for (let author in file.authors) {
    if (!folderInfo.authors[author]) {
      folderInfo.authors[author] = {
        added: 0,
        changes: 0,
        removed: 0,
        commits: 0,
        tasks: {},
        types: {},
        scopes: {},
      };
    }
    const folder = folderInfo.authors[author];
    const fileInfo = file.authors[author];
    folder.added += fileInfo.added;
    folder.changes += fileInfo.changes;
    folder.removed += fileInfo.removed;
    folder.commits += fileInfo.commits;
  }
}

function addInfoFromFolder(parentInfo: any, folder: any, path: string[]) {
  const folderInfo = { lines: 0, authors: {} };
  for (let fileName in folder.content) {
    if (folder.content[fileName].content) {
      addInfoFromFolder(folderInfo, folder.content[fileName], [...path, fileName]);
    } else {
      addInfoFromFile(folderInfo, folder.content[fileName]);
      addTotalInfo(folder.content[fileName]);
    }
  }
  addInfoFromFile(parentInfo, folderInfo);
  folder.path = path;
  folder.lines = folderInfo.lines;
  folder.authors = folderInfo.authors;
  addTotalInfo(folder);
}

export default function getFileTreeWithStatistic(rootTree: any) {
  const folderInfo = { lines: 0, authors: {}, path: [] };
  addInfoFromFolder(folderInfo, rootTree, []);
  return rootTree;
}