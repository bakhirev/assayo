import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { getDate } from 'ts/helpers/formatter';

function Fly({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      mode={mode}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_country.travel.date"
        properties="fromTimestamp"
        formatter={getDate}
        width={142}
      />
      <Column
        template={ColumnTypes.STRING}
        width={40}
        formatter={() => '✈️'}
      />
      <Column
        template={ColumnTypes.STRING}
        width={72}
        properties="fromTimezone"
      />
      <Column
        template={ColumnTypes.STRING}
        properties="title"
        title="plugin.team_country.travel.country"
      />
    </DataView>
  );
}

Fly.defaultProps = {
  response: undefined,
};

export default Fly;
