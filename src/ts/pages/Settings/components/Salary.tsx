import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitInputNumber from 'ts/components/UiKit/components/InputNumber';
import UiKitColumns from 'ts/components/UiKit/components/Columns';
import UiKitSwitch from 'ts/components/UiKit/components/Switch';
import PageBox from 'ts/components/Page/Box';
import Title from 'ts/components/Title';

import localization from 'ts/helpers/Localization';

import formStore from '../store/Form';

const Common = observer((): React.ReactElement | null => {
  const defaultSalary = formStore.state.defaultSalary;
  if (!defaultSalary) return null;

  return (
    <>
      <Title title="page.settings.common.title"/>
      <PageBox>
        <UiKitSwitch
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
        <UiKitColumns>
          <UiKitInputNumber
            title="page.settings.common.salary"
            value={defaultSalary.value}
            onChange={(value: number) => {
              formStore.updateState('defaultSalary.value', value);
            }}
          />
          <UiKitSwitch
            title="page.settings.common.currency"
            value={defaultSalary.currency}
            options={['RUB', 'USD', 'EUR']}
            onChange={(currency: string) => {
              formStore.updateState('defaultSalary.currency', currency);
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
          title="page.settings.common.workDaysInWeek"
          value={defaultSalary.workDaysInWeek}
          options={[1, 2, 3, 4, 5, 6, 7]}
          onChange={(workDaysInWeek: number) => {
            formStore.updateState('defaultSalary.workDaysInWeek', workDaysInWeek);
          }}
        />
        <UiKitSwitch
          title="page.settings.common.workDaysInWeek"
          value={defaultSalary.workDaysInWeek.map((v: number, i: number) => v ? (i + 1) : null)}
          options={[
            { id: 1, title: 'Пн' },
            { id: 2, title: 'Вт' },
            { id: 3, title: 'Ср' },
            { id: 4, title: 'Чт' },
            { id: 5, title: 'Пт' },
            { id: 6, title: 'Сб' },
            { id: 7, title: 'Вс' },
          ]}
          onChange={(workDaysInWeek: number[]) => {
            const formattedValue = (new Array(7)).fill(0)
              .map((v: number, i: number) => workDaysInWeek.includes(i + 1));
            console.log(formattedValue);
            formStore.updateState('defaultSalary.workDaysInWeek', formattedValue);
          }}
        />
      </PageBox>
    </>
  );
});

export default Common;
