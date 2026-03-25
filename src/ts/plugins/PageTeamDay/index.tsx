import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_day';

  getMenuItems() {
    return  [
      {
        id: 'day',
        group: 20,
        order: 90,
        link: '/team/day',
        title: 'sidebar.team.day',
        icon: './assets/menu/team_day.svg',
      },
    ];
  }

  getPage(path: string) {
    return path === '/team/day' ? <Page /> : undefined;
  }
}
