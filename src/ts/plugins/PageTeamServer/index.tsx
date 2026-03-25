import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_server';

  getMenuItems() {
    return [
      {
        id: 'server',
        group: 10,
        order: 80,
        link: '/team/server',
        title: 'plugin.team_server.sidebar',
        icon: './assets/menu/email.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/server' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
