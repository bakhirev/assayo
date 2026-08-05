import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_hours';

  getMenuItems() {
    return [
      {
        id: 'hours',
        group: 20,
        order: 120,
        link: '/team/hours',
        title: 'sidebar.team.hours',
        icon: './assets/menu/hours.svg',
      },
      {
        id: 'hours',
        group: 20,
        order: 70,
        link: '/person/hours/',
        title: 'sidebar.person.hours',
        icon: './assets/menu/hours.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    if (path === '/person/hours') {
      return (
        <Page
          mode={props?.mode}
          user={props?.user}
          filters={props?.filters}
        />
      );
    }

    if (path === '/team/hours') {
      return <Page mode={props?.mode}/>;
    }

    return undefined;
  }

  getTranslations() {
    return translations;
  }
}
