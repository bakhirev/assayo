import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'person_money';

  getMenuItems() {
    return  [
      {
        id: 'money',
        group: 10,
        order: 20,
        link: '/person/money/',
        title: 'sidebar.person.money',
        icon: './assets/menu/per_money.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/money' ? (
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
