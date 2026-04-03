import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_emails';

  getMenuItems() {
    return [
      {
        id: 'emails',
        group: 10,
        order: 80,
        link: '/team/emails',
        title: 'plugin.team_emails.sidebar',
        icon: './assets/menu/email.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/team/emails' ? <Page mode={props?.mode}/> : undefined;
  }

  getTranslations() {
    return translations;
  }
}
