import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_pull_requests';

  getMenuItems() {
    return [
      {
        id: 'pr',
        group: 40,
        order: 180,
        link: '/team/pr',
        title: 'plugin.team_pull_requests.sidebar',
        icon: './assets/menu/pull_request.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/pr' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
