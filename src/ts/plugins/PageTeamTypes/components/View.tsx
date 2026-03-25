import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import IHashMap from 'ts/interfaces/HashMap';
import ViewProps from 'ts/interfaces/ViewProps';
import statisticStore from 'ts/store/Statistics';

import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { DataView } from 'ts/components/Layout';

import { getMaxValues } from 'ts/helpers/charts';

function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  const { text } = useTranslation();
  const unknown = text('plugin.team_types.unknown');

  if (!response) return null;

  const [tasksMax, daysMax] = getMaxValues(response, ['tasks', 'daysByAuthorsTotal']);

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
        template={ColumnTypes.STRING}
        title="plugin.team_types.type"
        properties="type"
        formatter={(type: string) => type || unknown}
        width={150}
      />
      <Column
        width={80}
        template={ColumnTypes.SHORT_NUMBER}
        properties="tasks"
      />
      <Column
        isSortable
        title="plugin.team_types.tasks"
        properties="tasks"
        width={120}
        template={(value: number) => (
          <LineChart
            value={value}
            max={tasksMax}
            suffix="plugin.team_types.tasksSmall"
          />
        )}
      />
      <Column
        width={80}
        template={ColumnTypes.SHORT_NUMBER}
        title="plugin.team_types.days"
        properties="days"
      />
      <Column
        width={80}
        template={ColumnTypes.SHORT_NUMBER}
        properties="daysByAuthorsTotal"
      />
      <Column
        isSortable
        title="plugin.team_types.authorsDays"
        properties="daysByAuthorsTotal"
        width={120}
        template={(value: number) => (
          <LineChart
            value={value}
            max={daysMax}
            suffix="plugin.team_types.daysSmall"
          />
        )}
      />
      <Column
        width={80}
        template={ColumnTypes.NUMBER}
        title="plugin.team_types.commits"
        properties="commits"
      />
      <Column
        title="plugin.team_types.authors"
        properties="commitsByAuthors"
        template={(details: IHashMap<number>) => (
          <LineChart
            details={details}
            order={statisticStore.statisticsByCommits.author.list}
          />
        )}
        minWidth={200}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
