import { observable, action, makeObservable } from 'mobx';

class ViewSettingsStore {
  key: string = 'view_settings';

  version: number = 1;

  settings: any = {};

  constructor() {
    this.load();
    makeObservable(this, {
      settings: observable,
      load: action,
      setItem: action,
    });
  }

  load() {
    const settings = JSON.parse(localStorage.getItem(this.key) || '{}') || {};
    if (settings.version === this.version) {
      this.settings = settings.settings;
    }
  }

  save() {
    if (Object.keys(this.settings).length === 0) {
      localStorage.removeItem(this.key);
      return;
    }

    localStorage.setItem(this.key, JSON.stringify({
      version: this.version,
      settings: this.settings,
    }));
  }

  #getPath(path: any): string {
    if (!path) return '';
    if (Array.isArray(path)) {
      return path.join('.');
    } else if (typeof path === 'object') {
      return [path.type, path.page].join('.');
    }
    return path;
  }

  setItem(path: any, value: any, defaultValue?: any) {
    const formattedPath = this.#getPath(path);
    if (!formattedPath) return;

    if (!value || value === defaultValue) {
      delete this.settings[formattedPath];
    } else {
      this.settings[formattedPath] = value;
    }

    this.save();
  }

  getItem(path: any, defaultValue?: any): any {
    const formattedPath = this.#getPath(path);
    return this.settings?.[formattedPath] || defaultValue;
  }
}

const viewSettings = new ViewSettingsStore();

export default viewSettings;
