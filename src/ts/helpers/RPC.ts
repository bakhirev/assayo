import IHashMap from 'ts/interfaces/HashMap';
import localization from 'ts/helpers/Localization';

function getParametersFromString(text: string): IHashMap<string> {
  return Object.fromEntries((text || '')
    .substring(1, Infinity)
    .split('&')
    .map((token: string) => token.split('=')));
}

function getParametersFromURL(): IHashMap<string> {
  return {
    ...getParametersFromString(location.search),
    ...getParametersFromString(location.hash),
  };
}

function loadJsDump(url: string, callback: Function) {
  const script = document.createElement('script');
  script.src = url;
  script.async = true; // @ts-ignore
  script.onload = callback; // @ts-ignore
  script.onerror = callback;
  document.body.appendChild(script);
}

function loadCssFile(url: string) {
  const node = document.createElement('link');
  node.setAttribute('rel', 'stylesheet');
  node.setAttribute('href', url);
  document.body.appendChild(node);
}

export let applicationHasCustom = {
  theme: false,
  title: false,
};

export default function applyUrlCommands(callback: Function) {
  const parameters: IHashMap<string> = getParametersFromURL();

  const cssUrl = parameters.style || parameters.theme;
  if (cssUrl) {
    loadCssFile(cssUrl);
    applicationHasCustom.theme = true;
  }

  const title = parameters.title;
  if (title) {
    document.title = decodeURIComponent(title);
    applicationHasCustom.title = true;
  }

  const language = parameters.lang || parameters.language;
  if (language) {
    localization.language = language;
  }

  const jsUrl = parameters.dump || parameters.log;
  if (jsUrl) {
    loadJsDump(jsUrl, callback);
  } else {
    callback();
  }
}
