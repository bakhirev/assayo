import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import TeamPage from './components/Team';
import PersonPage from './components/Person';

export default class Plugin implements IPlugin {
  static id = 'team_month';

  getMenuItems() {
    return [
      {
        id: 'month',
        group: 20,
        order: 110,
        link: '/team/month',
        title: 'plugin.team_month.sidebar',
        icon: './assets/menu/month.svg',
      },
      {
        id: 'month',
        group: 20,
        order: 60,
        link: '/person/month/',
        title: 'plugin.team_month.sidebar',
        icon: './assets/menu/month.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    if (path === '/person/month') {
      return <PersonPage user={props?.user}/>;
    }
    if (path === '/team/month') {
      return <TeamPage mode={props?.mode}/>;
    }
  }

  getTranslations() {
    return translations;
  }
}
