import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './Files';

export default class Plugin implements IPlugin {
  id = 'PageTeamFiles';

  getMenuItems() {
    return  [
      {
        id: 'files',
        group: 30,
        link: '/team/files',
        title: 'sidebar.team.files',
        icon: './assets/menu/team_files.svg',
      },
      {
        id: 'removedFiles',
        group: 30,
        link: '/team/removedFiles',
        title: 'sidebar.team.removedFiles',
        icon: './assets/menu/team_files_remove.svg',
      },
    ];
  }

  getPage(path: string) {
    if (path === '/team/files') return <Page/>;
    if (path === '/team/removedFiles') return <Page type="removed"/>;
    return undefined;
  }
}
