import IHashMap from 'ts/interfaces/HashMap';

function getParametersFromString(text: string): IHashMap<string> {
  return Object.fromEntries((new URLSearchParams(text || '')).entries());
}

function getQueryFromHash(hash: string): string {
  const text = (hash || '').replace(/^#/, '');
  const index = text.indexOf('?');
  if (index !== -1) return text.slice(index + 1);
  if (text.startsWith('/')) return '';
  return text.includes('=') ? text : '';
}

export default function getParametersFromURL(): IHashMap<string> {
  return {
    ...getParametersFromString(location.search),
    ...getParametersFromString(getQueryFromHash(location.hash)),
  };
}
