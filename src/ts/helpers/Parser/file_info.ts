import ICommit from 'ts/interfaces/Commit';

export function getNewFileAuthor(
  addedLines: number,
  prev?: ICommit | null,
) {
  return {
    added: addedLines,
    changes: addedLines,
    removed: 0,
    commits: 1,
    tasks: { [prev?.task || '']: 1 },
    types: { [prev?.type || '']: 1 },
    scopes: { [prev?.scope || '']: 1 },
  };
}

export function getNewFileInfo(
  name: string,
  addedLines: number,
  commit?: ICommit | null,
) {
  const nameParts = name?.split('/')?.pop()?.split('.') || [];
  return {
    name,
    extension: nameParts.pop(),
    firstName: nameParts.shift(),
    suffixes: nameParts,
    lines: addedLines,
    firstCommit: commit,
    lastCommit: commit,
    authors: {
      [commit?.author || '']: getNewFileAuthor(addedLines, commit),
    },
  };
}
