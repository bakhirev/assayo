import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamPullFileAnalytics';

  getMenuItems() {
    return  [
      {
        id: 'extension',
        group: 30,
        link: '/team/extension',
        title: 'sidebar.team.extension',
        icon: './assets/menu/team_files_ext.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/extension' ? <Page mode={props?.mode}/> : undefined;
  }
}
