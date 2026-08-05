import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';
export default class Plugin implements IPlugin {
  static id = 'team_author';

  getMenuItems() {
    return [
      {
        id: 'author',
        group: 10,
        order: 30,
        link: '/team/author',
        title: 'sidebar.team.author',
        icon: './assets/menu/work.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/author' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
