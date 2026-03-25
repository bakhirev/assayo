import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'person_total';

  getMenuItems() {
    return  [
      {
        id: 'total',
        group: 10,
        order: 10,
        link: '/person/total/',
        title: 'plugin.person_total.sidebar',
        icon: './assets/menu/team_common.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/total' ? (
      <Page
        mode={props?.mode}
        user={props?.user}
        filters={props?.filters}
      />
    ) : undefined;
  }

  getTranslations() {
    return translations;
  }
}
