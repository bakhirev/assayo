import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_recommendations';

  getMenuItems() {
    return  [
      {
        id: 'recommendations',
        group: 50,
        order: 220,
        link: '/team/recommendations',
        title: 'sidebar.team.recommendations',
        icon: './assets/menu/recommendations.svg',
      },
    ];
  }

  getPage(path: string) {
    return path === '/team/recommendations' ? <Page/> : undefined;
  }
}
