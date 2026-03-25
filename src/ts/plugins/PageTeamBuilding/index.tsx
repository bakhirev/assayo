import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_building';

  getMenuItems() {
    return  [
      {
        id: 'building',
        group: 50,
        order: 230,
        link: '/team/building',
        title: 'plugin.team_building.sidebar',
        icon: './assets/menu/building.svg',
      },
    ];
  }

  getPage(path: string) {
    return path === '/team/building' ? <Page/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
