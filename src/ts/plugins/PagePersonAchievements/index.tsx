import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'person_achievements';

  getMenuItems() {
    return  [
      {
        id: 'achievements',
        group: 10,
        order: 15,
        link: '/person/achievements/',
        title: 'plugin.person_achievements.sidebar',
        icon: './assets/menu/common.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/achievements' ? (
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
