import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamPullTasks';

  getMenuItems() {
    return  [
      {
        id: 'words',
        group: 50,
        link: '/team/words',
        title: 'sidebar.team.words',
        icon: './assets/menu/team_words.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/words' ? <Page mode={props?.mode}/> : undefined;
  }
}
