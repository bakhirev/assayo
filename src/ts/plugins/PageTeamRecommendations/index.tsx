import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';
import translations from './translations';

export default class Plugin implements IPlugin {
  static id = 'team_recommendations';

  dependencies = ['recommendations'];

  getMenuItems() {
    return  [
      {
        id: 'recommendations',
        group: 50,
        order: 220,
        link: '/team/recommendations',
        title: 'plugin.team_recommendations.sidebar',
        icon: './assets/menu/recommendations.svg',
      },
    ];
  }

  getPage(path: string) {
    return path === '/team/recommendations' ? <Page/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
