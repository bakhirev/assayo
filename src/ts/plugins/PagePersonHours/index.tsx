import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PagePersonHours';

  getMenuItems() {
    return  [
      {
        id: 'hours',
        group: 20,
        link: '/person/hours/',
        title: 'sidebar.person.hours',
        icon: './assets/menu/team_hours.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/hours' ? (
      <Page
        mode={props?.mode}
        user={props?.user}
        filters={props?.filters}
      />
    ) : undefined;
  }
}
