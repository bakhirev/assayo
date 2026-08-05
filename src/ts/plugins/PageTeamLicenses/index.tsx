import React from 'react';

import {
  IPlugin,
  PageOptions,
} from 'ts/helpers/Plugins/interfaces/Plugin';
import sourceData from 'ts/store/SourceData';
import statisticsByPackageJson from 'ts/helpers/StatisticsByPackageJson';
import { ISourceData } from 'ts/interfaces/SourceData';

import translations from './translations';
import Page from './components';

export default class Plugin implements IPlugin {
  static id = 'team_licenses';

  getMenuItems(data?: ISourceData) {
    if (!data?.packages) return [];

    return  [
      {
        id: 'licenses',
        group: 70,
        order: 200,
        link: '/team/licenses',
        title: 'plugin.team_licenses.sidebar',
        icon: './assets/menu/licenses.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    if (path !== '/team/licenses') return undefined;
    statisticsByPackageJson.clear();
    statisticsByPackageJson.update(sourceData.data.packages);
    statisticsByPackageJson.updateTotalInfo();
    console.log(statisticsByPackageJson);
    return <Page mode={props?.mode}/>;
  }

  getTranslations() {
    return translations;
  }
}
