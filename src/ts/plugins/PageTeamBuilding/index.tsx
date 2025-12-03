import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamBuilding';

  getMenuItems() {
    return  [
      {
        id: 'building',
        group: 50,
        link: '/team/building',
        title: 'sidebar.team.building',
        icon: './assets/menu/building.svg',
      },
    ];
  }

  getPage(path: string) {
    return path === '/team/building' ? <Page/> : undefined;
  }
}
