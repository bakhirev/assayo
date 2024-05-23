import { IFileChange } from 'ts/interfaces/Commit';

function getFilePath(path: string): string[] {
  const formattedPath = path
    .replace(/"/gm, '')
    .replace(/\/\//gm, '/');

  const parts = formattedPath.split(/(?:\{)|(?:\s=>\s)|(?:})/gm);
  if (parts.length !== 2 && parts.length !== 4) return [formattedPath];

  if (parts.length === 2) parts.unshift('');

  let oldPath = `${parts[0] || ''}${parts[1] || ''}${parts[3] || ''}`;
  let newPath = `${parts[0] || ''}${parts[2] || ''}${parts[3] || ''}`;

  if (!parts[1]) oldPath = oldPath.replace(/\/\//gm, '/');
  if (!parts[2]) newPath = newPath.replace(/\/\//gm, '/');

  return [oldPath, newPath];
}

// "38	9	src/app.css" -> [38, 9, 9, 'src/app.css']
export function getNumStatInfo(message: string) {
  let [addedRaw, removedRaw, path] = message.split('\t');

  let added = parseInt(addedRaw, 10) || 0;
  let removed = parseInt(removedRaw, 10) || 0;

  let changes = 0;
  if (added > removed) {
    added = added - removed;
    changes = removed;
    removed = 0;
  } else if (removed > added) {
    removed = removed - added;
    changes = added;
    added = 0;
  } else {
    changes = added;
    added = 0;
    removed = 0;
  }

  return {
    path,
    addedLines: added,
    removedLines: removed,
    changedLines: changes,
  };
}
// ":000000 100644 000000000 fc44b0a37 A	public/logo192.png" -> ['A', 'public/logo192.png']
export function getRawInfo(message: string) {
  const action = message[35];
  const path = message.split('\t')[1];
  return { path, action };
}

// "src/AppGit.css" -> { id: 'src/appgit.css', path: 'src/AppGit.css' }
export function getInfoFromPath(path: string): IFileChange {
  const [oldPath, newPath] = getFilePath(path);

  const id = oldPath.toLowerCase();
  const newId = newPath?.toLowerCase();

  return {
    id,
    newId: (newId && id !== newId) ? newId : undefined,
    path: newPath || oldPath,

    action: '',
    addedLines: 0,
    removedLines: 0,
    changedLines: 0,
  };
}
