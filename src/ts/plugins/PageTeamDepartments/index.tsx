import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_departments';

  getMenuItems() {
    return [
      {
        id: 'departments',
        group: 10,
        order: 60,
        link: '/team/departments',
        title: 'plugin.team_departments.sidebar',
        icon: './assets/menu/department.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/departments' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
