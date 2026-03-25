import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'person_vacation';

  getMenuItems() {
    return  [
      {
        id: 'vacation',
        group: 20,
        order: 75,
        link: '/person/vacation/',
        title: 'plugin.person_vacation.sidebar',
        icon: './assets/menu/vacation.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/vacation' ? (
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
