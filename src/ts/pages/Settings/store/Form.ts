import { action, makeObservable } from 'mobx';

import { IUserSetting } from 'ts/interfaces/UserSetting';
import Form from 'ts/store/Form';
import settingsApi from 'ts/api/settings';
import userSettings from 'ts/store/UserSettings';
import notificationsStore from 'ts/components/Notifications/store';

class FormStore extends Form {
  constructor() {
    super();
    makeObservable(this, {
      save: action,
    });
  }

  save(body: IUserSetting): Promise<any> {
    const { saveSettings } = settingsApi;
    return this.submit(saveSettings, body, false)
      .then((response: any) => {
        notificationsStore.show('common.notifications.setting');
        userSettings.loadUserSettings();
        this.setInitState(this.state);
        return Promise.resolve(response);
      });
  }
}

const formStore = new FormStore();

export default formStore;
