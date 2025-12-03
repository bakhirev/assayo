import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamRefactor';

  getMenuItems() {
    return  [
      {
        id: 'refactor',
        group: 30,
        link: '/team/refactor',
        title: 'sidebar.team.refactor',
        icon: './assets/menu/refactor.svg',
      },
      {},
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/refactor' ? <Page mode={props?.mode}/> : undefined;
  }
}
