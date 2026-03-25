import React from 'react';

import { IPlugin, PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

import Modal from './components/Modal';
import All from './components/All';
import Person from './components/Person';
import Team from './components/Team';
import printStore from './components/store';
import translations from './translations';

export default class Plugin implements IPlugin {
  static id = 'print';

  getHeaderItems() {
    return  [
      {
        id: 'print',
        link: '/person/changes/',
        title: 'plugin.print.sidebar',
        icon: './assets/menu/print.svg',
        onClick: (navigate: Function, location: any) => () => {
          printStore.open(navigate, location.pathname);
        },
      },
    ];
  }

  getMenuItems() {
    return  [];
  }

  getPage(path: string, props?: PageOptions) {
    return {
      '/person/print': <Person user={props?.user} />,
      '/team/print': <Team />,
      '/print': <All />,
      'global': <Modal />,
    }[path];
  }

  getTranslations() {
    return translations;
  }
}
