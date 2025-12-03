import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PagePersonCommits';

  getMenuItems() {
    return  [
      {
        id: 'commits',
        group: 40,
        link: '/person/commits/',
        title: 'sidebar.person.commits',
        icon: './assets/menu/pull-request.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/commits' ? (
      <Page
        mode={props?.mode}
        user={props?.user}
        filters={props?.filters}
      />
    ) : undefined;
  }
}
