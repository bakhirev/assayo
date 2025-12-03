import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PagePersonSpeed';

  getMenuItems() {
    return  [
      {
        id: 'speed',
        group: 10,
        link: '/person/speed/',
        title: 'sidebar.person.speed',
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
}
