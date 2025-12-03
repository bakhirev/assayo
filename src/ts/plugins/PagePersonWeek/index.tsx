import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PagePersonWeek';

  getMenuItems() {
    return  [
      {
        id: 'week',
        group: 20,
        link: '/person/week/',
        title: 'sidebar.person.week',
        icon: './assets/menu/team_week.svg',
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
