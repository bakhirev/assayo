import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'person_changes';

  getMenuItems() {
    return  [
      {
        id: 'changes',
        group: 40,
        order: 100,
        link: '/person/changes/',
        title: 'sidebar.person.changes',
        icon: './assets/menu/branch.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/changes' ? (
      <Page
        mode={props?.mode}
        user={props?.user}
        filters={props?.filters}
      />
    ) : undefined;
  }
}
