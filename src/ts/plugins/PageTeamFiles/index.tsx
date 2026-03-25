import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_files';

  getMenuItems() {
    return  [
      {
        id: 'files',
        group: 30,
        order: 130,
        link: '/team/files',
        title: 'plugin.team_files.sidebar.files',
        icon: './assets/menu/team_files.svg',
      },
      {
        id: 'removedFiles',
        group: 30,
        order: 131,
        link: '/team/removedFiles',
        title: 'plugin.team_files.sidebar.removedFiles',
        icon: './assets/menu/team_files_remove.svg',
      },
    ];
  }

  getPage(path: string) {
    if (path === '/team/files') return <Page/>;
    if (path === '/team/removedFiles') return <Page type="removed"/>;
    return undefined;
  }

  getTranslations() {
    return translations;
  }
}
