import notificationsStore from 'ts/components/Notifications/store';
import { getStringsForParser } from 'ts/components/DropZone/helpers';

function loadGitLogFromFile(url: string, callback: Function) {
  const script = document.createElement('script');
  script.src = url;
  script.async = true; // @ts-ignore
  script.onload = callback; // @ts-ignore
  script.onerror = () => {
    notificationsStore.show('common.fileLoader.notification');
  };
  document.body.appendChild(script);
}

function loadGitLogFromUrl(url: string, callback: Function) {
  fetch(url)
    .then((response) => response.text())
    .then((text) => {
      getStringsForParser(text || '');
      callback();
    });
}

export function loadGitLog(url: string, callback: Function) {
  if (url?.[0] === '.') {
    loadGitLogFromFile(url, callback);
  } else {
    loadGitLogFromUrl(url, callback);
  }
}

export function loadCssFile(url: string) {
  const node = document.createElement('link');
  node.setAttribute('rel', 'stylesheet');
  node.setAttribute('href', url);
  document.body.appendChild(node);
}
