import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PagePersonDay';

  getMenuItems() {
    return  [
      {
        id: 'day',
        group: 20,
        link: '/person/day/',
        title: 'sidebar.person.day',
        icon: './assets/menu/team_day.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/day' ? (
      <Page
        mode={props?.mode}
        user={props?.user}
        filters={props?.filters}
      />
    ) : undefined;
  }
}
