import React from 'react';

export interface PageOptions {
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
  getPage?: (path: string, props?: PageOptions) => React.ReactElement | null | undefined | void;
}
