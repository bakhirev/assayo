import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PageTeamCountries';

  getMenuItems() {
    return [
      {
        id: 'country',
        group: 10,
        link: '/team/country',
        title: 'sidebar.team.country',
        icon: './assets/menu/country.svg',
      },
      {},
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/country' ? <Page mode={props?.mode}/> : undefined;
  }
}
