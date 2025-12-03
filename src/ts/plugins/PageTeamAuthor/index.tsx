import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamAuthors';

  getMenuItems() {
    return [
      {
        id: 'author',
        group: 10,
        link: '/team/author',
        title: 'sidebar.team.author',
        icon: './assets/menu/team_work.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/author' ? <Page mode={props?.mode}/> : undefined;
  }
}
