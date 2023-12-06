import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render } from 'react-dom';

import localization from 'ts/helpers/Localization';
import ru from 'ts/translations/ru/index';
import en from 'ts/translations/en/index';
import Authorization from 'ts/pages/Authorization';
import userSettings from 'ts/store/UserSettings';
import Notifications from 'ts/components/Notifications';
import printStore from 'ts/pages/PageWrapper/store/Print';
import applyUrlCommands from 'ts/helpers/RPC';

import './styles/index.scss';

// eslint-disable-next-line
// @ts-ignore
if (module.hot) {
  // eslint-disable-next-line
  // @ts-ignore
  module.hot.accept();
}

localization.parse('en', en);
localization.parse('ru', ru);

function renderReactApplication() {
  // @ts-ignore
  console.log(window?.report?.length);
  window.onafterprint = () => {
    printStore.endPrint();
  };
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

userSettings.loadUserSettings().then(() => {
  applyUrlCommands(renderReactApplication);
});
