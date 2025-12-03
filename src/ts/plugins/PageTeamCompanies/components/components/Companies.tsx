import React from 'react';
import { useTranslation } from 'react-i18next';

import { IPagination } from 'ts/interfaces/Pagination';
import { getDate } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import UiKitTags from 'ts/components/UiKit/components/Tags';
import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import { getMaxValues } from 'ts/helpers/getMax';

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
    t('page.team.company.active.yes'),
    t('page.team.company.active.no'),
  ];

  const [tasksMax, daysMax] = getMaxValues(response, ['tasks', 'totalDays']);

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
        template={ColumnTypes.DETAILS}
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
        template={ColumnTypes.STRING}
        properties="company"
        width={200}
      />
      <Column
        title="page.team.author.status"
        formatter={(row: any) => (row.isActive ? works : dismissed)}
        template={(value: string) => <UiKitTags value={value} />}
        width={140}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="from"
        title="page.team.author.firstCommit"
        width={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="to"
        title="page.team.author.lastCommit"
        width={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalDays"
        width={90}
      />
      <Column
        isSortable
        title="page.team.author.daysAll"
        properties="totalDays"
        width={150}
        template={(value: number) => (
          <LineChart
            value={value}
            max={daysMax}
            suffix="page.team.author.days"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="tasks"
        width={90}
      />
      <Column
        isSortable
        title="page.team.author.tasks"
        properties="tasks"
        width={150}
        template={(value: number) => (
          <LineChart
            value={value}
            max={tasksMax}
            suffix="page.team.author.tasksSmall"
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
