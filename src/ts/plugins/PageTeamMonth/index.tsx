import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_month';

  getMenuItems() {
    return [
      {
        id: 'month',
        group: 20,
        order: 110,
        link: '/team/month',
        title: 'plugin.team_month.sidebar',
        icon: './assets/menu/team_month.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/month' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
