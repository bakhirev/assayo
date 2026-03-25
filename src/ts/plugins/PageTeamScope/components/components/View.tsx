import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import ViewProps from 'ts/interfaces/ViewProps';
import { getMoney, getDate } from 'ts/helpers/formatter';
import statisticStore from 'ts/store/Statistics';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import Details from './Details';

function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  const { text } = useTranslation();

  if (!response) return null;

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
        formatter={(scope: any) => <Details scope={scope} />}
      />
      <Column
        isFixed
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_scope.scope"
        properties="scope"
        width={200}
        formatter={(value: string) => (
          value ? value : text('plugin.team_scope.unknown')
        )}
      />
      <Column
        isSortable
        template={ColumnTypes.NUMBER}
        title="plugin.team_scope.days"
        properties="totalDaysWorked"
      />
      <Column
        isSortable
        template={ColumnTypes.NUMBER}
        title="plugin.team_scope.authorsDays"
        properties="totalDaysWorkedByAuthor"
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        title="plugin.team_scope.tasks"
        properties="totalTasks"
      />
      <Column
        isSortable
        template={ColumnTypes.NUMBER}
        title="plugin.team_scope.lastCommit"
        properties="lastCommit"
        formatter={getDate}
      />
      <Column
        isSortable
        template={ColumnTypes.NUMBER}
        title="plugin.team_scope.commits"
        properties="commits"
      />
      <Column
        title="plugin.team_scope.authors"
        properties="commitsByAuthor"
        minWidth={150}
        template={(details: any) => (
          <LineChart
            details={details}
            order={statisticStore.statisticsByCommits.author.list}
          />
        )}
      />
      <Column
        isSortable
        template={ColumnTypes.NUMBER}
        title="plugin.team_scope.cost"
        properties="cost"
        formatter={getMoney}
      />
    </DataView>
  );
}

export default View;
