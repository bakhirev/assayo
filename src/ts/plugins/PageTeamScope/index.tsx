import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamPullScope';

  getMenuItems() {
    return [
      {
        id: 'scope',
        group: 10,
        link: '/team/scope',
        title: 'sidebar.team.scope',
        icon: './assets/menu/team_feat.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/scope' ? <Page mode={props?.mode}/> : undefined;
  }
}
