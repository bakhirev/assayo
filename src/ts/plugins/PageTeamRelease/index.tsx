import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamPullReleases';

  getMenuItems() {
    return [
      {
        id: 'release',
        group: 40,
        link: '/team/release',
        title: 'sidebar.team.release',
        icon: './assets/menu/release.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/release' ? <Page mode={props?.mode}/> : undefined;
  }
}
