import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import LineChart from 'ts/components/LineChart';
import { getMax } from 'ts/pages/Common/helpers/getMax';
import { getDate } from 'ts/helpers/formatter';

import AllPR from '../PR/All';

interface ViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const delay = getMax(response, 'delayInDays');
  const waiting = getMax(response, 'waitingInDays');
  const max = Math.max(delay, waiting);
  const delayChart = getOptions({ max, suffix: 'page.team.release.chart' });

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
          const content = row.prIds.map((prId: string) => (
            dataGripStore?.dataGrip?.pr?.pr?.get(prId)
          )).filter((v: any) => v);
          return (
            <AllPR // @ts-ignore
              response={{ content }}
              mode="details"
            />
          );
        }}
      />
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        title="page.team.release.title"
        properties="title"
        width={200}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.release.from"
        width={150}
        properties="from"
        formatter={getDate}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.release.to"
        width={150}
        properties="to"
        formatter={getDate}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        title="page.team.release.prLength"
        properties="prLength"
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="delayInDays"
      />
      <Column
        isSortable
        title="page.team.release.delay"
        properties="delayInDays"
        width={170}
        minWidth={170}
        template={(value: number) => (
          <LineChart
            options={delayChart}
            value={value}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="waitingInDays"
      />
      <Column
        isSortable
        title="page.team.release.waiting"
        properties="waitingInDays"
        width={170}
        minWidth={170}
        template={(value: number) => (
          <LineChart
            options={delayChart}
            value={value}
          />
        )}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
