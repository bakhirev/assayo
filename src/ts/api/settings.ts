import { IUserSetting } from 'ts/interfaces/UserSetting';
import getEmptySettings from 'ts/pages/Settings/helpers/getEmptySettings';

export default {
  loadSettings(): Promise<IUserSetting> {
    const defaultSettings = getEmptySettings();
    const response = localStorage.getItem('settings');
    const defaultResponse = () => {
      localStorage.removeItem('settings');
      return Promise.resolve(defaultSettings);
    };

    if (!response || response === JSON.stringify(defaultSettings)) {
      return defaultResponse();
    }

    const jsonFromMemory = JSON.parse(response);
    if (jsonFromMemory.version !== defaultSettings.version) {
      return defaultResponse();
    }

    return Promise.resolve(jsonFromMemory);
  },

  saveSettings(body: IUserSetting): Promise<any> {
    const defaultSettings = getEmptySettings();
    if (JSON.stringify(defaultSettings) === JSON.stringify(body)) {
      localStorage.removeItem('settings');
    } else {
      localStorage.setItem('settings', JSON.stringify(body));
    }
    return Promise.resolve();
  },
};
