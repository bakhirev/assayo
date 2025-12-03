import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Modal from './components/Modal';
import All from './components/All';
import Person from './components/Person';
import Team from './components/Team';
import printStore from './components/store';

export default class Plugin implements IPlugin {
  id = 'Print';

  getHeaderItems() {
    return  [
      {
        id: 'print',
        link: '/person/changes/',
        title: 'sidebar.buttons.print',
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

  getPage(path: string) {
    return {
      '/person/print': <Person />,
      '/team/print': <Team />,
      '/print': <All />,
      'global': <Modal />,
    }[path];
  }
}
