import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PagePersonMonth';

  getMenuItems() {
    return  [
      {
        id: 'month',
        group: 20,
        link: '/person/month/',
        title: 'sidebar.person.month',
        icon: './assets/menu/team_month.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/month' ? (
      <Page
        mode={props?.mode}
        user={props?.user}
        filters={props?.filters}
      />
    ) : undefined;
  }
}
