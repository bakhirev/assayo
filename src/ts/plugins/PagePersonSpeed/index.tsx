import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'person_speed';

  getMenuItems() {
    return  [
      {
        id: 'speed',
        group: 10,
        order: 30,
        link: '/person/speed/',
        title: 'plugin.person_speed.sidebar',
        icon: './assets/menu/per_speed.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/speed' ? (
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
