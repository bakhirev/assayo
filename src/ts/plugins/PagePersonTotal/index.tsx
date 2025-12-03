import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PagePersonTotal';

  getMenuItems() {
    return  [
      {
        id: 'total',
        group: 10,
        link: '/person/total/',
        title: 'sidebar.person.total',
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
}
