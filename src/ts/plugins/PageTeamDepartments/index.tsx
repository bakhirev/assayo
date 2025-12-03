import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamDepartments';

  getMenuItems() {
    return [
      {
        id: 'department',
        group: 10,
        link: '/team/department',
        title: 'sidebar.team.department',
        icon: './assets/menu/department.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/department' ? <Page mode={props?.mode}/> : undefined;
  }
}
