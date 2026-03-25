import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_companies';

  getMenuItems() {
    return [
      {
        id: 'company',
        group: 10,
        order: 50,
        link: '/team/company',
        title: 'sidebar.team.company',
        icon: './assets/menu/company.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/company' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
