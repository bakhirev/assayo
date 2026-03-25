import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'sponsor';

  getPage(path: string) {
    return path === 'global' ? <Page /> : undefined;
  }
}
