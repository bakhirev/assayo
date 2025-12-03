import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamMonths';

  getMenuItems() {
    return [
      {
        id: 'month',
        group: 20,
        link: '/team/month',
        title: 'sidebar.team.month',
        icon: './assets/menu/team_month.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/month' ? <Page mode={props?.mode}/> : undefined;
  }
}
