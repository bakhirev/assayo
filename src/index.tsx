import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render } from 'react-dom';

import ru from 'ts/config/translations/ru';
import Authorization from 'ts/pages/Authorization';
import userSettings from 'ts/store/UserSettings';
import Notifications from 'ts/components/Notifications';

import './styles/index.scss';

// eslint-disable-next-line
// @ts-ignore
if (module.hot) {
  // eslint-disable-next-line
  // @ts-ignore
  module.hot.accept();
}

// @ts-ignore
console.dir(ru + '');

function getParametersFromString(text: string) {
  return Object.fromEntries((text || '')
    .substring(1, Infinity)
    .split('&')
    .map((token: string) => token.split('=')));
}

function renderReactApplication() {
  // @ts-ignore
  console.log(window?.report?.length);
  render(
    <React.StrictMode>
      <HashRouter>
        <Authorization/>
        <Notifications/>
      </HashRouter>
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

function loadApplication() {
  const parameters = {
    ...getParametersFromString(location.search),
    ...getParametersFromString(location.hash),
  };

  if (!parameters.dump) {
    return renderReactApplication();
  }

  const script = document.createElement('script');
  script.src = parameters.dump;
  script.async = true;
  script.onload = renderReactApplication;
  script.onerror = renderReactApplication;
  document.body.appendChild(script);
}

userSettings.loadUserSettings().then(() => {
  loadApplication();
});
