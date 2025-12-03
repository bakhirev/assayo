import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitInputNumber from 'ts/components/UiKit/components/InputNumber';
import UiKitColumns from 'ts/components/UiKit/components/Columns';
import UiKitSwitch from 'ts/components/UiKit/components/Switch';
import PageBox from 'ts/components/Page/Box';
import { Title } from 'ts/components/Layout';

import localization from 'ts/helpers/Localization';
import { getDayName } from 'ts/helpers/formatter';

import formStore from '../store/Form';

const Common = observer((): React.ReactElement | null => {
  const defaultSalary = formStore.state.defaultSalary;
  if (!defaultSalary) return null;

  return (
    <>
      <Title title="page.settings.common.title"/>
      <PageBox>
        <UiKitSwitch
          disabled
          title="page.settings.common.type.title"
          value={defaultSalary.type}
          options={[
            { id: 'full', title: localization.get('page.settings.common.type.full') },
            { id: 'part', title: localization.get('page.settings.common.type.part') },
          ]}
          onChange={(type: any) => {
            formStore.updateState('defaultSalary.type', type?.id);
          }}
        />
        <UiKitSwitch
          disabled
          multiple
          title="page.settings.common.workDaysInWeek"
          value={defaultSalary.workDaysInWeek.map((v: number, i: number) => v ? (i + 1) : null)}
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
            const formattedValue = (new Array(7)).fill(0)
              .map((v: number, i: number) => workDaysInWeek.includes(i + 1));
            console.log(formattedValue);
            formStore.updateState('defaultSalary.workDaysInWeek', formattedValue);
          }}
        />
        <UiKitColumns>
          <UiKitInputNumber
            title="page.settings.common.salary"
            value={defaultSalary.value}
            onChange={(value: number) => {
              formStore.updateState('defaultSalary.value', value);
            }}
          />
          <UiKitInputNumber
            disabled
            title="page.settings.common.tax"
            value={defaultSalary.tax}
            onChange={(value: number) => {
              formStore.updateState('defaultSalary.tax', value);
            }}
          />
        </UiKitColumns>
        <UiKitColumns>
          <UiKitInputNumber
            title="page.settings.common.workDaysInYear"
            value={defaultSalary.workDaysInYear}
            onChange={(workDaysInYear: number) => {
              formStore.updateState('defaultSalary.workDaysInYear', workDaysInYear);
            }}
          />
          <UiKitInputNumber
            title="page.settings.common.vacationDaysInYear"
            value={defaultSalary.vacationDaysInYear}
            onChange={(vacationDaysInYear: number) => {
              formStore.updateState('defaultSalary.vacationDaysInYear', vacationDaysInYear);
            }}
          />
        </UiKitColumns>
        <UiKitSwitch
          title="page.settings.common.currency"
          value={defaultSalary.currency}
          options={['USD', 'EUR', 'RUB', 'CNY', 'JPY', 'KRW', 'CAD']}
          onChange={(currency: string) => {
            formStore.updateState('defaultSalary.currency', currency);
          }}
        />
      </PageBox>
    </>
  );
});

export default Common;
