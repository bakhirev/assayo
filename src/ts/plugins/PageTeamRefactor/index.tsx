import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_refactor';

  getMenuItems() {
    return  [
      {
        id: 'refactor',
        group: 30,
        order: 150,
        link: '/team/refactor',
        title: 'plugin.team_refactor.sidebar',
        icon: './assets/menu/refactor.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/refactor' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
