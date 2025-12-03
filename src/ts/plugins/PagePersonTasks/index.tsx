import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PagePersonTasks';

  getMenuItems() {
    return  [
      {
        id: 'tasks',
        group: 30,
        link: '/person/tasks/',
        title: 'sidebar.person.tasks',
        icon: './assets/menu/team_tasks.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/tasks' ? (
      <Page
        mode={props?.mode}
        user={props?.user}
        filters={props?.filters}
      />
    ) : undefined;
  }
}
