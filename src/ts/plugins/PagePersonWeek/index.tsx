import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'person_week';

  getMenuItems() {
    return  [
      {
        id: 'week',
        group: 20,
        order: 50,
        link: '/person/week/',
        title: 'sidebar.person.week',
        icon: './assets/menu/week.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/week' ? (
      <Page
        mode={props?.mode}
        user={props?.user}
      />
    ) : undefined;
  }
}
