import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_file_analytics';

  getMenuItems() {
    return  [
      {
        id: 'extension',
        group: 30,
        order: 140,
        link: '/team/extension',
        title: 'plugin.team_file_analytics.sidebar',
        icon: './assets/menu/team_files_ext.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/extension' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
