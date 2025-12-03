import { IPlugin, MenuItem } from './interfaces/Plugin';
import { HashMap } from 'ts/interfaces/HashMap';

import PluginList from 'ts/plugins';

class Plugins {
  plugins: IPlugin[] = [];

  refIdPlugin: HashMap<IPlugin> = new Map;

  constructor(plugins: IPlugin[]) {
    this.plugins = plugins // @ts-ignore
      .map((plugin) => new plugin())
      .filter(instance => instance);

    this.plugins.forEach((plugin) => {
      if (!plugin.id) return;
      this.refIdPlugin.set(plugin.id, plugin);
    });
  }

  #getItems(method: string, prefix?: string) {
    const allMenuItems = this.plugins
      .map((plugin) => plugin?.[method]?.())
      .flat()
      .filter((item) => item);

    const byPrefix = prefix
      ? allMenuItems.filter(item => item?.link?.[1] === prefix)
      : allMenuItems;

    let prev = byPrefix[0];
    return byPrefix.reduce((acc, item) => {
      if (prev?.group !== item?.group) acc.push({});
      acc.push(item);
      prev = item;
      return acc;
    }, []);
  }

  getMenuItems(prefix?: string) {
    return this.#getItems('getMenuItems', prefix) as MenuItem[];
  }

  getHeaderItems(prefix?: string) {
    return this.#getItems('getHeaderItems', prefix) as MenuItem[];
  }

  getPage(path?: string, props?: Record<string, any>) {
    for (let i = 0, l = this.plugins.length; i < l; i++) {
      const plugin = this.plugins[i];
      const page = plugin?.getPage?.(path || '', props || {});
      if (page) return page;
    }
    return null;
  }

  getPages(path?: string, props?: Record<string, any>) {
    return this.plugins
      .map((plugin) => plugin?.getPage?.(path || '', props || {}))
      .filter(instance => instance) as React.ReactNode[];
  }

  getById(id?: string) {
    return this.refIdPlugin.get(id || '');
  }
}

const plugins = new Plugins(PluginList as IPlugin[]);

export default plugins;
