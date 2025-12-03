import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { getMaxValues } from 'ts/helpers/getMax';
import { getDate } from 'ts/helpers/formatter';

import PullRequests from './PullRequests';

interface ViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const [delay, waiting] = getMaxValues(response, ['delayInDays', 'waitingInDays']);
  const max = Math.max(delay, waiting);

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
          const content = row.prIds.map((prId: string) => (
            dataGripStore?.dataGrip?.pr?.pr?.get(prId)
          )).filter((v: any) => v);
          return (
            <PullRequests // @ts-ignore
              response={{ content }}
              mode="details"
            />
          );
        }}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        title="page.team.release.title"
        properties="title"
        width={200}
      />
      <Column
        template={ColumnTypes.STRING}
        title="page.team.release.from"
        width={150}
        properties="from"
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        title="page.team.release.to"
        width={150}
        properties="to"
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        title="page.team.release.prLength"
        properties="prLength"
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="delayInDays"
      />
      <Column
        isSortable
        title="page.team.release.delay"
        properties="delayInDays"
        minWidth={170}
        template={(value: number) => (
          <LineChart
            value={value}
            max={max}
            suffix="page.team.release.chart"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="waitingInDays"
      />
      <Column
        isSortable
        title="page.team.release.waiting"
        properties="waitingInDays"
        minWidth={170}
        template={(value: number) => (
          <LineChart
            value={value}
            max={max}
            suffix="page.team.release.chart"
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
