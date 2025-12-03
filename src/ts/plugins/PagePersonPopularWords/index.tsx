import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'PagePersonPopularWords';

  getMenuItems() {
    return  [
      {
        id: 'words',
        group: 40,
        link: '/person/words/',
        title: 'sidebar.person.words',
        icon: './assets/menu/team_words.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    return path === '/person/words' ? (
      <Page
        mode={props?.mode}
        user={props?.user}
      />
    ) : undefined;
  }
}
