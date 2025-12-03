import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamTypes';

  getMenuItems() {
    return  [
      {
        id: 'type',
        group: 10,
        link: '/team/type',
        title: 'sidebar.team.type',
        icon: './assets/menu/team_type.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/type' ? <Page mode={props?.mode}/> : undefined;
  }
}
