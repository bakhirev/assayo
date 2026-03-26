import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_tasks';

  getMenuItems() {
    return [
      {
        id: 'tasks',
        group: 40,
        order: 170,
        link: '/team/tasks',
        title: 'plugin.team_tasks.sidebar',
        icon: './assets/menu/tasks.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/tasks' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
