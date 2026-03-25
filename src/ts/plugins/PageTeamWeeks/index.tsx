import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_weeks';

  getMenuItems() {
    return  [
      {
        id: 'week',
        group: 20,
        order: 100,
        link: '/team/week',
        title: 'plugin.team_weeks.sidebar',
        icon: './assets/menu/team_week.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/week' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
