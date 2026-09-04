import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { Package } from 'ts/helpers/StatisticsByPackageJson/components/packages';

export function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
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
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_dependencies.results.title"
        properties="title"
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        title="plugin.team_dependencies.results.level"
        properties="level"
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_dependencies.results.path"
        formatter={(row: Package) => row.materializedPaths?.[0]?.join('/')}
      />
    </DataView>
  );
}

export default View;
