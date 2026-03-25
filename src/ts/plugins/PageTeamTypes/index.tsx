import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_types';

  getMenuItems() {
    return  [
      {
        id: 'types',
        group: 10,
        order: 40,
        link: '/team/types',
        title: 'sidebar.team.type',
        icon: './assets/menu/team_type.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/types' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
