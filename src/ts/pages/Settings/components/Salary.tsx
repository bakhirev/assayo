import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitInputNumber from 'ts/components/UiKit/components/InputNumber';
import UiKitColumns from 'ts/components/UiKit/components/Columns';
import UiKitSwitch from 'ts/components/UiKit/components/Switch';
import PageBox from 'ts/components/Page/Box';
import Title from 'ts/components/Title';

import formStore from '../store/Form';

const Common = observer((): React.ReactElement | null => {
  const defaultSalary = formStore.state.defaultSalary;
  if (!defaultSalary) return null;

  return (
    <>
      <Title title="Общие данные по зарплате"/>
      <PageBox>
        <UiKitSwitch
          title="Тип работы над проектом"
          value={defaultSalary.type}
          options={[
            { id: 'full', title: 'Полная занятость' },
            { id: 'part', title: 'Проектная работа' },
          ]}
          onChange={(type: any) => {
            formStore.updateState('defaultSalary.type', type?.id);
          }}
        />
        <UiKitColumns>
          <UiKitInputNumber
            title="Зарплата в месяц"
            value={defaultSalary.value}
            onChange={(value: number) => {
              formStore.updateState('defaultSalary.value', value);
            }}
          />
          <UiKitSwitch
            title="Валюта"
            value={defaultSalary.currency}
            options={['RUB', 'USD', 'EUR']}
            onChange={(currency: string) => {
              formStore.updateState('defaultSalary.currency', currency);
            }}
          />
        </UiKitColumns>
        <UiKitColumns>
          <UiKitInputNumber
            title="Количество рабочих дней в году"
            value={defaultSalary.workDaysInYear}
            onChange={(workDaysInYear: number) => {
              formStore.updateState('defaultSalary.workDaysInYear', workDaysInYear);
            }}
          />
          <UiKitInputNumber
            title="Количество дней отпуска в год"
            value={defaultSalary.vacationDaysInYear}
            onChange={(vacationDaysInYear: number) => {
              formStore.updateState('defaultSalary.vacationDaysInYear', vacationDaysInYear);
            }}
          />
        </UiKitColumns>
        <UiKitSwitch
          title="Количество рабочих дней в неделю"
          value={defaultSalary.workDaysInWeek}
          options={[1, 2, 3, 4, 5, 6, 7]}
          onChange={(workDaysInWeek: number) => {
            formStore.updateState('defaultSalary.workDaysInWeek', workDaysInWeek);
          }}
        />
      </PageBox>
    </>
  );
});

export default Common;
