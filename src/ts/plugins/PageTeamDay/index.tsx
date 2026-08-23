import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';
import translations from './translations';

export default class Plugin implements IPlugin {
  static id = 'team_day';

  getMenuItems() {
    return  [
      {
        id: 'day',
        group: 20,
        order: 100,
        link: '/team/day',
        title: 'plugin.team_day.sidebar',
        icon: './assets/menu/day.svg',
      },
      // {
      //   id: 'person_day',
      //   group: 20,
      //   order: 50,
      //   link: '/person/day/',
      //   title: 'plugin.team_day.sidebar',
      //   icon: './assets/menu/day.svg',
      // },
    ];
  }

  getPage(path: string) {
    return (path === '/team/day' || path === '/person/day') ? <Page /> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
