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
  return {
    name,
    extension: name?.split('.')?.pop(),
    lines: addedLines,
    created: commit,
    authors: {
      [commit?.author || '']: getNewFileAuthor(addedLines, commit),
    },
  };
}