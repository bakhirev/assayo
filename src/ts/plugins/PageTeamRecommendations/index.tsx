import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamRecommendations';

  getMenuItems() {
    return  [
      {
        id: 'recommendations',
        group: 50,
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
