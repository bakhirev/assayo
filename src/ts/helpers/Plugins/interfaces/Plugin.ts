import React from 'react';
import IHashMap from 'ts/interfaces/HashMap';

export interface PageOptions {
  id?: string;
  mode?: string;
  user?: any;
  filters?: any;
}

export interface MenuItem {
  id?: string;
  group?: number;
  link?: string;
  title?: string;
  icon?: string;
  onClick?: Function;
}

export interface IPlugin {
  id?: string;
  getHeaderItems?: () => MenuItem[];
  getMenuItems?: () => MenuItem[];
  getTranslations?: () => IHashMap<string>;
  getPage?: (path: string, props?: PageOptions) => React.ReactElement | null | undefined | void;
}
