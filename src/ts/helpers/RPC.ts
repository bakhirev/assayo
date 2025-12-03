import IHashMap from 'ts/interfaces/HashMap';
import localization from 'ts/helpers/Localization';
import notificationsStore from 'ts/components/Notifications/store';
import { getStringsForParser } from 'ts/components/DropZone/helpers';

function getParametersFromString(text: string): IHashMap<string> {
  return Object.fromEntries((new URLSearchParams(text || '')).entries());
}

function getParametersFromURL(): IHashMap<string> {
  return {
    ...getParametersFromString(location.search),
    ...getParametersFromString(location.hash),
  };
}

function loadJsLocal(url: string, callback: Function) {
  const script = document.createElement('script');
  script.src = url;
  script.async = true; // @ts-ignore
  script.onload = callback; // @ts-ignore
  script.onerror = () => {
    notificationsStore.show('common.fileLoader.notification');
  };
  document.body.appendChild(script);
}

function loadJsGlobal(url: string, callback: Function) {
  fetch(url)
    .then((response) => response.text())
    .then((text) => {
      getStringsForParser(text || '');
      callback();
    });
}

function loadJsDump(url: string, callback: Function) {
  if (url?.[0] === '.') {
    loadJsLocal(url, callback);
  } else {
    loadJsGlobal(url, callback);
  }
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
  const parameters = getParametersFromURL();

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
    localization.updateLangAttribute();
  }

  const jsUrl = parameters.dump || parameters.log;
  if (jsUrl) {
    loadJsDump(jsUrl, () => callback(parameters));
  } else {
    callback(parameters);
  }
}
