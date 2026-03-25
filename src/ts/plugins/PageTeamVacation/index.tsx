import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_vacation';

  getMenuItems() {
    return  [
      {
        id: 'vacation',
        group: 10,
        order: 85,
        link: '/team/vacation/',
        title: 'plugin.team_vacation.sidebar',
        icon: './assets/menu/vacation.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/vacation' ? <Page mode={props?.mode} /> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
