import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { getMaxValues } from 'ts/helpers/charts';
import { DataView } from 'ts/components/Layout';

function Types({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const [current, removed] = getMaxValues(response, ['files', 'removedFiles']);
  const max = Math.max(current, removed);

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
        title="plugin.team_file_analytics.name"
        properties="type"
        width={200}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_file_analytics.path"
        width={350}
        formatter={(row: any) => row.files === 1 || row.removedFiles === 1 ? row.path : ''}
      />
      <Column
        template={ColumnTypes.TASK}
        title="common.statistic.Tasks"
        width={120}
        formatter={(row: any) => row.files < 5 ? row.task : ''}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="files"
      />
      <Column
        isSortable
        title="plugin.team_file_analytics.current.count"
        properties="files"
        minWidth={170}
        template={(value: number) => (
          <LineChart
            value={value}
            max={max}
            suffix="plugin.team_file_analytics.files"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="removedFiles"
      />
      <Column
        isSortable
        title="plugin.team_file_analytics.removed.count"
        properties="removedFiles"
        minWidth={170}
        template={(value: number) => (
          <LineChart
            value={value}
            max={max}
            suffix="plugin.team_file_analytics.files"
          />
        )}
      />
    </DataView>
  );
}

Types.defaultProps = {
  response: undefined,
};

export default Types;
