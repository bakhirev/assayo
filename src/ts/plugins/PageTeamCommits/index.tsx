import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_commits';

  getMenuItems() {
    return  [
      {
        id: 'commits',
        group: 50,
        order: 190,
        link: '/team/commits',
        title: 'plugin.team_commits.sidebar',
        icon: './assets/menu/pull-request.svg',
      },
    ];
  }

  getPage(path: string) {
    return path === '/team/commits' ? <Page/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
