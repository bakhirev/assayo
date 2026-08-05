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
  static id = 'team_dependencies';

  getMenuItems(data?: ISourceData) {
    if (!data?.packages) return [];

    return  [
      {
        id: 'dependencies',
        group: 70,
        order: 200,
        link: '/team/dependencies',
        title: 'plugin.team_dependencies.sidebar',
        icon: './assets/menu/dependencies.svg',
      },
    ];
  }

  getPage(path: string, props?: PageOptions) {
    if (path !== '/team/dependencies') return undefined;
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
