import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitSwitch from 'ts/components/UiKit/components/Switch';
import PageBox from 'ts/components/Page/Box';
import applicationConfig from 'ts/store/ApplicationConfig';
import { getDayName } from 'ts/helpers/formatter';
import statisticStore from 'ts/store/Statistics';

const Days = observer((): React.ReactElement | null => {
  const value = applicationConfig.config?.workDays
    .map((v: boolean, i: number) => v ? (i + 1) : null);

  return (
    <PageBox>
       <UiKitSwitch
         multiple
         title="plugin.settings.days.works"
         value={value}
         options={[
           { id: 1, title: getDayName(0, 'short') },
           { id: 2, title: getDayName(1, 'short') },
           { id: 3, title: getDayName(2, 'short') },
           { id: 4, title: getDayName(3, 'short') },
           { id: 5, title: getDayName(4, 'short') },
           { id: 6, title: getDayName(5, 'short') },
           { id: 7, title: getDayName(6, 'short') },
         ]}
         onChange={(workDaysInWeek: number[]) => {
           const workDays = (new Array(7)).fill(0)
             .map((v: number, i: number) => workDaysInWeek.includes(i + 1));
           applicationConfig.updateConfigProperty('workDays', workDays);
           statisticStore.updateStatistic();
         }}
       />
    </PageBox>
  );
});

export default Days;
