import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamPullRequests';

  getMenuItems() {
    return [
      {
        id: 'pr',
        group: 40,
        link: '/team/pr',
        title: 'sidebar.team.pr',
        icon: './assets/menu/pull_request.svg',
      },
      {},
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/pr' ? <Page mode={props?.mode}/> : undefined;
  }
}
