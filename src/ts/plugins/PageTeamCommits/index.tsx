import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamCommits';

  getMenuItems() {
    return  [
      {
        id: 'commits',
        group: 50,
        link: '/team/commits',
        title: 'sidebar.team.commits',
        icon: './assets/menu/pull-request.svg',
      },
    ];
  }

  getPage(path: string) {
    return path === '/team/commits' ? <Page/> : undefined;
  }
}
