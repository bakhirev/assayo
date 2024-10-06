import React from 'react';
import { useTranslation } from 'react-i18next';

import ICommit from 'ts/interfaces/Commit';
import { IPagination } from 'ts/interfaces/Pagination';
import { getDate } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import UiKitTags from 'ts/components/UiKit/components/Tags';
import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import { getMax } from 'ts/pages/Common/helpers/getMax';

import Employments from './Employments';

interface CompaniesProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Companies({ response, updateSort, rowsForExcel, mode }: CompaniesProps) {
  const { t } = useTranslation();
  if (!response) return null;

  const [works, dismissed] = [
    t('page.team.author.type.work'),
    t('page.team.author.type.dismissed'),
  ];

  const taskChart = getOptions({ max: getMax(response, 'totalTasks'), suffix: 'page.team.author.tasksSmall' });
  const daysChart = getOptions({ max: getMax(response, 'totalDays'), suffix: 'page.team.author.days' });

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isFixed
        template={ColumnTypesEnum.DETAILS}
        width={40}
        formatter={(row: any) => {
          const content = row.employments.map((name: string) => (
            dataGripStore?.dataGrip?.author?.statisticByName?.[name]
          )).filter((v: any) => v);
          return (
            <Employments // @ts-ignore
              response={{ content }}
              mode="details"
            />
          );
        }}
      />
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        properties="company"
        title="page.team.pr.author"
        width={200}
      />
      <Column
        title="page.team.author.status"
        formatter={(row: any) => (row.isActive ? works : dismissed)}
        template={(value: string) => <UiKitTags value={value} />}
        width={100}
      />
      {/*<Column*/}
      {/*  template={ColumnTypesEnum.SHORT_NUMBER}*/}
      {/*  title="page.team.company.people"*/}
      {/*  properties="totalEmployments"*/}
      {/*  width={90}*/}
      {/*/>*/}
      <Column
        template={ColumnTypesEnum.STRING}
        properties="firstCommit"
        title="page.team.author.firstCommit"
        width={130}
        formatter={(commit: ICommit) => getDate(commit.timestamp)}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        properties="lastCommit"
        title="page.team.author.lastCommit"
        width={130}
        formatter={(commit: ICommit) => getDate(commit.timestamp)}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="totalDays"
        width={90}
      />
      <Column
        isSortable="totalDays"
        title="page.team.author.daysAll"
        properties="totalDays"
        width={150}
        template={(value: number) => (
          <LineChart
            options={daysChart}
            value={value}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="totalTasks"
        width={90}
      />
      <Column
        isSortable="totalTasks"
        title="page.team.author.tasks"
        properties="totalTasks"
        width={150}
        template={(value: number) => (
          <LineChart
            options={taskChart}
            value={value}
          />
        )}
      />
      <Column
        properties="emptyCell"
        minWidth={40}
      />
    </DataView>
  );
}

Companies.defaultProps = {
  response: undefined,
};

export default Companies;
