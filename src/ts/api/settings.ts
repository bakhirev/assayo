import { ISetting } from 'ts/pages/Settings/interfaces/Setting';
import getEmptySettings from 'ts/pages/Settings/helpers/getEmptySettings';

export default {
  loadSettings(): Promise<ISetting> {
    const response = localStorage.getItem('settings');
    return response
      ? Promise.resolve(JSON.parse(response))
      : Promise.resolve(getEmptySettings());
  },

  saveSettings(body: ISetting): Promise<any> {
    localStorage.setItem('settings', JSON.stringify(body));
    return Promise.resolve();
  },
};
