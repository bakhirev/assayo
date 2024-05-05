import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';

import localization from 'ts/helpers/Localization';
import de from 'ts/translations/de';
import en from 'ts/translations/en';
import es from 'ts/translations/es';
import fr from 'ts/translations/fr';
import ja from 'ts/translations/ja';
import pt from 'ts/translations/pt';
import ru from 'ts/translations/ru';
import zh from 'ts/translations/zh';

import initializationI18n from './ts/helpers/i18n';

import Authorization from 'ts/pages/Authorization';
import userSettings from 'ts/store/UserSettings';
import themeSettings from 'ts/store/ThemeSettings';
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

localization.parse('de', de);
localization.parse('en', en);
localization.parse('es', es);
localization.parse('fr', fr);
localization.parse('ja', ja);
localization.parse('pt', pt);
localization.parse('ru', ru);
localization.parse('zh', zh);

function renderReactApplication() {
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

applyUrlCommands((parameters: any) => {
  initializationI18n(parameters.lang || parameters.language);
  themeSettings.setUrlParameters(parameters);
  userSettings.loadUserSettings().then(() => {
    renderReactApplication();
  });
});
