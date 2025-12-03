import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamTasks';

  getMenuItems() {
    return [
      {
        id: 'tasks',
        group: 40,
        link: '/team/tasks',
        title: 'sidebar.team.tasks',
        icon: './assets/menu/team_tasks.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/tasks' ? <Page mode={props?.mode}/> : undefined;
  }
}
