import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_changes';

  getMenuItems() {
    return [
      {
        id: 'changes',
        group: 50,
        order: 200,
        link: '/team/changes',
        title: 'sidebar.team.changes',
        icon: './assets/menu/branch.svg',
      },
    ];
  }

  getPage(path: string) {
    return path === '/team/changes' ? <Page/> : undefined;
  }
}
