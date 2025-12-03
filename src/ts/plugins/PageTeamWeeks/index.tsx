import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamWeeks';

  getMenuItems() {
    return  [
      {
        id: 'week',
        group: 20,
        link: '/team/week',
        title: 'sidebar.team.week',
        icon: './assets/menu/team_week.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/week' ? <Page mode={props?.mode}/> : undefined;
  }
}
