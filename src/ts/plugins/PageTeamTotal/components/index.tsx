import React from 'react';
import { observer } from 'mobx-react-lite';

import { Title } from 'ts/components/Layout';
import statisticStore from 'ts/store/Statistics';

import CommonInfo from './components/CommonInfo';
import Release from './components/Release';
import Money from './components/Money';

const Total = observer((): React.ReactElement => {
  const taskCodes = statisticStore.statisticsByCommits.taskCodes;
  const employeesInCompany = taskCodes.totalInfo
    .filter((item: any) => item.months?.length > 5)
    .reduce((acc: number, item: any) => (
      acc + item.months[0]?.allMiddleUsersInDepartment
    ), 0);

  return (
    <>
      <Title title="plugin.team_total.common.title"/>
      <CommonInfo employeesInCompany={employeesInCompany} />
      <Release />
      <Title title="plugin.team_total.money.title"/>
      <Money />
    </>
  );
});

export default Total;
