import { action, makeObservable } from 'mobx';

import Form from 'ts/store/Form';
import settingsApi from 'ts/api/settings';
import { ISetting } from '../interfaces/Setting';

class FormStore extends Form {
  constructor() {
    super();
    makeObservable(this, {
      save: action,
    });
  }

  save(body: ISetting): Promise<any> {
    const { saveSettings } = settingsApi;
    return this.submit(saveSettings, body, false)
      .then((response: any) => {
        this.setInitState(this.state);
        return Promise.resolve(response);
      });
  }
}

const formStore = new FormStore();

export default formStore;
