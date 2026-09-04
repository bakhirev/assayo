import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import localization from 'ts/helpers/Localization';
import de from 'ts/translations/de';
import en from 'ts/translations/en';
import es from 'ts/translations/es';
import fr from 'ts/translations/fr';
import ja from 'ts/translations/ja';
import pt from 'ts/translations/pt';
import ru from 'ts/translations/ru';
import ko from 'ts/translations/ko';
import zh from 'ts/translations/zh';

import initializationI18n from './ts/helpers/i18n';
import { getModifiedText } from 'ts/helpers/copyPasteFormatter';

import Main from 'ts/pages/index';
import applicationConfig from 'ts/store/ApplicationConfig';
import referenceStore from 'ts/store/ReferenceStore';
import Notifications from 'ts/components/Notifications';
import printStore from 'ts/plugins/Print/components/store';

import ApplicationConfig from 'ts/interfaces/ApplicationConfig';
import getApplicationConfig from 'ts/helpers/ApplicationConfig/getConfig';
import plugins, { getEnabledPlugins } from 'ts/helpers/Plugins';
import { loadCssFile, loadGitLog } from 'ts/helpers/loadSource';
import pluginsList from 'ts/plugins';

import './styles/index.scss';
import { updateExchangeRate } from './ts/helpers/formatter';

import statisticStore from 'ts/store/StatisticsByCommitsStore';
import sourceData from 'ts/store/SourceData';

localization.addTranslationsForLanguage('de', de);
localization.addTranslationsForLanguage('en', en);
localization.addTranslationsForLanguage('es', es);
localization.addTranslationsForLanguage('fr', fr);
localization.addTranslationsForLanguage('ja', ja);
localization.addTranslationsForLanguage('pt', pt);
localization.addTranslationsForLanguage('ru', ru);
localization.addTranslationsForLanguage('ko', ko);
localization.addTranslationsForLanguage('zh', zh);

if (Math.random() > 2) {
  document.addEventListener('copy', function applyCopyFormatter(event) {
    const selection = document.getSelection();
    const originalText = selection ? selection.toString() : '';
    if (!originalText || !event.clipboardData) return;
    const modifiedText = getModifiedText(originalText);
    event.clipboardData.setData('text/plain', modifiedText);
    event.preventDefault();
  });
}

function globalReportObserver() {
  // @ts-ignore
  const globalData = window.report || [];
  if (!globalData?.length) return;

  const gitLog = sourceData.get('gitLog');
  if (gitLog?.length === globalData?.length) return;

  const clone = [...globalData];
  sourceData.add('gitLog', clone);
  statisticStore.asyncSetCommits(clone);
}

function renderReactApplication() {
  window.onafterprint = () => {
    printStore.endPrint();
  };

  const container = document.getElementById('root');
  if (!container) return;

  console.log('renderReactApplication');
  setInterval(globalReportObserver, 1000);

  createRoot(container).render(
    <React.StrictMode>
      <HashRouter>
        <Main />
        <Notifications/>
      </HashRouter>
    </React.StrictMode>,
  );
}

getApplicationConfig((config: ApplicationConfig) => {
  applicationConfig.updateConfig(config);
  plugins.setPlugins(getEnabledPlugins(pluginsList, config));

  updateExchangeRate(config.exchangeRate);
  if (config.urlForCss) loadCssFile(config.urlForCss);
  if (config.title) document.title = 'localhost' || config.title;
  initializationI18n(config.language);
  plugins.getTranslations().forEach((translation) => {
    Object.entries(translation as any).forEach(([langId, text]) => {
      localization.addTranslationsForLanguage(langId, text as string);
    });
  });

  referenceStore.setReference(config.ref);

  if (config.urlForGitLog) {
    loadGitLog(config.urlForGitLog, () => renderReactApplication());
  } else {
    renderReactApplication();
  }
});
