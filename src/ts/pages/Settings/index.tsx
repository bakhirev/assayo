import React from 'react';
import { observer } from 'mobx-react-lite';

import DataLoader from 'ts/components/DataLoader';
import SettingForm from './components/Form';
import settingsApi from 'ts/api/settings';
import formStore from './store/Form';

const SettingPage = observer((): React.ReactElement | null => {
  return (
    <DataLoader
      to="response"
      loader={() => settingsApi.loadSettings().then((response) => {
        formStore.setInitState(response);
        return Promise.resolve(response);
      })}
    >
      <SettingForm />
    </DataLoader>
  );
});

export default SettingPage;
