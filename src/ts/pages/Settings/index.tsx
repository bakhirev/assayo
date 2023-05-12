import React from 'react';
import { observer } from 'mobx-react-lite';

import DataLoader from 'ts/components/DataLoader';
import SettingForm from './components/Form';
// import settingsStore from 'ts/store/Settings';
import settingsApi from 'ts/api/settings';
import formStore from './store/Form';
//
// function getDeepCopy(state: any) {
//   const {
//     from,
//     to,
//     minCommits,
//     isFullTime,
//     defaultSalary,
//     defaultWorkDays,
//     holidaysInYear,
//     currency,
//     salary,
//     workDays,
//   } = state;
//   return {
//     from,
//     to,
//     minCommits,
//     isFullTime,
//     defaultSalary,
//     defaultWorkDays,
//     holidaysInYear,
//     currency,
//     salary: { ...salary },
//     workDays: { ...workDays },
//   };
// }

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
