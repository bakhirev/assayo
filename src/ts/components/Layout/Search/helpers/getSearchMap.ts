import ICommit from 'ts/interfaces/Commit';

export function getClearText(text?: string) {
  const REGEXP_SYMBOLS = /[[\]{}\-().,*?!'"%$^]/gim;
  const MORE_SPACE = /\s{2,}/gim;
  return (text || '')
    .toLocaleLowerCase()
    .replace(REGEXP_SYMBOLS, ' ')
    .replace(MORE_SPACE, ' ')
    .trim();
}

function getKey(commit: ICommit, properties: string | string[]) {
  const keys = Array.isArray(properties) ? properties : [properties];
  return keys
    .filter((property: string) => property)
    .reduce((acc, property) => `${acc} ` + getClearText(`${commit?.[property]}`), '')
    .trim();
}

export default function getSearchMap(list: ICommit[], properties: string | string[]) {
  return list.map((commit: ICommit) => ({
    key: getKey(commit, properties),
    value: commit,
  })).filter((item) => item.key);
}
