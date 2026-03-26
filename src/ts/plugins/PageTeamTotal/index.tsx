import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_total';

  getMenuItems() {
    return [
      {
        id: 'total',
        group: 10,
        order: 10,
        link: '/team/total',
        title: 'plugin.team_total.sidebar',
        icon: './assets/menu/common.svg',
      },
    ];
  }

  getPage(path: string) {
    return path === '/team/total' ? <Page /> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
