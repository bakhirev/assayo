import { HashMap } from 'ts/interfaces/HashMap';
import sourceData from 'ts/store/SourceData';

import { IPlugin, MenuItem } from './interfaces/Plugin';

function normalizePath(path?: string) {
  return (path || '').replace(/\/+$/, '');
}

export { default as getEnabledPlugins } from './helpers/getEnabledPlugins';

class Plugins {
  plugins: IPlugin[] = [];

  refIdPlugin: HashMap<IPlugin> = new Map;

  setPlugins(plugins: IPlugin[]) {
    this.plugins = [];
    this.refIdPlugin.clear();
    plugins.forEach((plugin) => { // @ts-ignore
      const instance = new plugin();
      if (!instance) return;
      this.plugins.push(instance);
      this.refIdPlugin.set(plugin.id, instance);
    });
  }

  #getItems(method: string, prefix?: string) {
    const allMenuItems = this.plugins
      .map((plugin) => plugin?.[method]?.(sourceData.data))
      .flat()
      .filter((item) => item)
      .sort((a, b) => ((a.order || 0) - (b.order || 0)));

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
    const normalizedPath = normalizePath(path);
    for (let i = 0; i < this.plugins.length; i++) {
      const plugin = this.plugins[i];
      const menuItems = plugin?.getMenuItems?.() || [];
      const hasPage = menuItems?.some((item) => (
        normalizePath(item?.link) === normalizedPath
      ));
      if (!hasPage) continue;

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

  getTranslations() {
    return this.plugins
      .map((plugin) => plugin?.getTranslations?.())
      .filter((translations) => translations);
  }
}

const plugins = new Plugins();

export default plugins;
