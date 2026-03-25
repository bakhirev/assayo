import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import statisticStore from 'ts/store/Statistics';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { getMaxValues } from 'ts/helpers/charts';
import { getDate } from 'ts/helpers/formatter';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';

import PullRequests from './PullRequests';

function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const prByName = statisticStore.statisticsByCommits.pr.totalInfoByName;
  const [delay, waiting] = getMaxValues(response, ['delayInDays', 'daysAwaitNextRelease']);
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
          const content = row.prIds
            .map((prId: number) => prByName.get(prId))
            .filter((v: any) => v);
          return (
            <FakeDataLoader content={content}>
              <PullRequests mode="details" />
              <Pagination />
            </FakeDataLoader>
          );
        }}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        title="plugin.team_release.view.title"
        properties="title"
        width={200}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_release.view.from"
        width={150}
        properties="dateCreate"
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_release.view.to"
        width={150}
        properties="dateMerge"
        formatter={getDate}
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        title="plugin.team_release.view.pr"
        properties="totalPR"
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="delayInDays"
      />
      <Column
        isSortable
        title="plugin.team_release.view.delay"
        properties="delayInDays"
        minWidth={170}
        template={(value: number) => (
          <LineChart
            value={value}
            max={max}
            suffix="plugin.team_release.view.chart"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="daysAwaitNextRelease"
      />
      <Column
        isSortable
        title="plugin.team_release.view.waiting"
        properties="daysAwaitNextRelease"
        minWidth={170}
        template={(value: number) => (
          <LineChart
            value={value}
            max={max}
            suffix="plugin.team_release.view.chart"
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
