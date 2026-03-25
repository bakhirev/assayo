import { getClearText } from './getSearchMap';

interface SearchMap {
  key: string;
  value: any;
}

interface SearchWord {
  id: string;
  value: any;
}

function getIndex(key: string, regExps: SearchWord[]) {
  return regExps.reduce((acc: number, regExp) => {
    const count = (key.match(regExp.value)?.length || 0);
    if (count) {
      acc = acc + 1 + (count / 100);
    }
    return acc;
  }, 0);
}

function getRegExps(text: string): SearchWord[] {
  return text
    .replace(/[[()\]{}\\.^$|?+\-]+/g, '')
    .split(/\s+/)
    .map((word) => ({
      id: word,
      value: new RegExp(`(${word})`, 'g'),
    }));
}

function getContentWithSearchIndex(searchMap: SearchMap[], text: string) {
  const regExps = getRegExps(text);
  return searchMap
    .map((item) => ([item.value, getIndex(item.key, regExps)]))
    .filter((item) => item[1]);
}

function applySortBySearchIndex(contentWithIndex: any[]) {
  contentWithIndex.sort((a, b) => {
    const byIndex = b[1] - a[1];
    if (byIndex) return byIndex;
    return b[0].milliseconds - a[0].milliseconds;
  });
}

function getContentWithoutSearchIndex(contentWithIndex: any[]) {
  return contentWithIndex.map((item) => item[0]);
}

export default function searchByQuery(
  searchMap: SearchMap[],
  query: string,
  useSortBySearchIndex?: boolean,
): any[] {
  const formattedQuery = getClearText(query);
  const contentWithSearchIndex = getContentWithSearchIndex(searchMap, formattedQuery);
  if (useSortBySearchIndex) applySortBySearchIndex(contentWithSearchIndex);
  return getContentWithoutSearchIndex(contentWithSearchIndex);
}
