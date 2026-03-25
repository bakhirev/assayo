import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'settings';

  getHeaderItems() {
    return  [
      {
        id: 'settings',
        link: '/settings',
        title: 'plugin.settings.sidebar',
        icon: './assets/menu/setting.svg',
        onClick: (navigate: Function) => () => {
          navigate('/settings');
        },
      },
    ];
  }

  getMenuItems() {
    return  [];
  }

  getPage(path: string) {
    return path === '/settings' ? <Page /> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
