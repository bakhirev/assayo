import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamPullTasks';

  getMenuItems() {
    return [
      {
        id: 'total',
        group: 10,
        link: '/team/total',
        title: 'sidebar.team.total',
        icon: './assets/menu/team_common.svg',
      },
    ];
  }

  getPage(path: string) {
    return path === '/team/total' ? <Page/> : undefined;
  }
}
