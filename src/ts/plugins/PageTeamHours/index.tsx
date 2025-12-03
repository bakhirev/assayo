import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamHours';

  getMenuItems() {
    return  [
      {
        id: 'hours',
        group: 20,
        link: '/team/hours',
        title: 'sidebar.team.hours',
        icon: './assets/menu/team_hours.svg',
      },
      {},
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/hours' ? <Page mode={props?.mode}/> : undefined;
  }
}
