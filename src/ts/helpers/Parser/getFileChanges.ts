import { IFileChange } from 'ts/interfaces/Commit';

function getFilePath(path: string): string[] {
  // 0	0	"UI tests/\\320\\224\\320\\276\\320\\272\\321\\203\\320/my_lock.lock"
  const formattedPath = path[path.length - 1] === '"'
    ? path.replace(/"/gm, '').replace(/\/\//gm, '/')
    : path;

  if (formattedPath.indexOf('{') === -1) return [formattedPath];

  const parts = formattedPath.split(/(?:\{)|(?:\s=>\s)|(?:})/gm);
  if (parts.length !== 2 && parts.length !== 4) return [formattedPath];

  if (parts.length === 2) parts.unshift('');

  let oldPath = `${parts[0] || ''}${parts[1] || ''}${parts[3] || ''}`;
  let newPath = `${parts[0] || ''}${parts[2] || ''}${parts[3] || ''}`;

  if (!parts[1]) oldPath = oldPath.replace(/\/\//gm, '/');
  if (!parts[2]) newPath = newPath.replace(/\/\//gm, '/');

  return [oldPath, newPath];
}

function fastNumStatSplit(message: string) {
  let firstIndex = 0;
  if (message[1] === '\t') firstIndex = 1;
  else if (message[2] === '\t') firstIndex = 2;
  else if (message[3] === '\t') firstIndex = 3;
  else if (message[4] === '\t') firstIndex = 4;
  else if (message[5] === '\t') firstIndex = 5;

  let secondIndex = firstIndex + 2;
  if (message[firstIndex + 2] === '\t') secondIndex = firstIndex + 2;
  else if (message[firstIndex + 3] === '\t') secondIndex = firstIndex + 3;
  else if (message[firstIndex + 4] === '\t') secondIndex = firstIndex + 4;
  else if (message[firstIndex + 5] === '\t') secondIndex = firstIndex + 5;
  else if (message[firstIndex + 6] === '\t') secondIndex = firstIndex + 6;

  return [
    message.substring(0, firstIndex),
    message.substring(firstIndex + 1, secondIndex),
    message.substring(secondIndex + 1),
  ];
}

// "38	9	src/app.css" -> [38, 9, 'src/app.css']
export function getNumStatInfo(message: string) {
  let [addedRaw, removedRaw, path] = fastNumStatSplit(message);
  // let [addedRaw, removedRaw, path] = message.split('\t');

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
  return {
    action: message[35],
    path: message.substring(37),
  };
}

// "src/AppGit.css" -> { id: 'src/appgit.css', path: 'src/AppGit.css' }
export function getInfoFromPath(path: string): IFileChange {
  const [oldPath, newPath] = getFilePath(path);

  const id = oldPath.toLowerCase(); // TODO: performance
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
