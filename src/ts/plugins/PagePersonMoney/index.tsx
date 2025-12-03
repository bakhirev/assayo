import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PagePersonMoney';

  getMenuItems() {
    return  [
      {
        id: 'money',
        group: 10,
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
}
