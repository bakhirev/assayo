import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { getDate } from 'ts/helpers/formatter';

function Details({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      mode="details"
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        title="plugin.team_server.protocol"
        properties="protocol"
        template={ColumnTypes.TAGS}
        width={80}
      />
      <Column
        title="plugin.team_server.port"
        properties="port"
        template={ColumnTypes.TAGS}
        width={80}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_server.url"
        properties="url"
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        properties="from"
        width={150}
        formatter={getDate}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        properties="to"
        width={150}
        formatter={getDate}
      />
    </DataView>
  );
}

Details.defaultProps = {
  response: undefined,
};

export default Details;
