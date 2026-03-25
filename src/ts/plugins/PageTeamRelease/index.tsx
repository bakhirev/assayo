import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_release';

  getMenuItems() {
    return [
      {
        id: 'release',
        group: 40,
        order: 160,
        link: '/team/release',
        title: 'plugin.team_release.sidebar',
        icon: './assets/menu/release.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/release' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
