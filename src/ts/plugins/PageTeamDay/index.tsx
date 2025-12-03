import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamTempo';

  getMenuItems() {
    return  [
      {
        id: 'day',
        group: 20,
        link: '/team/day',
        title: 'sidebar.team.day',
        icon: './assets/menu/team_day.svg',
      },
    ];
  }

  getPage(path: string) {
    return path === '/team/day' ? <Page/> : undefined;
  }
}
