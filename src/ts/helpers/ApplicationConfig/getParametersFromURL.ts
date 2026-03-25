import IHashMap from 'ts/interfaces/HashMap';

function getParametersFromString(text: string): IHashMap<string> {
  return Object.fromEntries((new URLSearchParams(text || '')).entries());
}

export default function getParametersFromURL(): IHashMap<string> {
  return {
    ...getParametersFromString(location.search),
    ...getParametersFromString(location.hash),
  };
}
