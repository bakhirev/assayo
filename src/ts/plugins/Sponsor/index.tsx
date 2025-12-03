import React from 'react';

import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';

import Page from './components';

export default class Plugin implements IPlugin {
  id = 'Sponsor';

  getPage(path: string) {
    return path === 'global' ? <Page /> : undefined;
  }
}
