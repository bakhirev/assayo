import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { getDate } from 'ts/helpers/formatter';

import Details from './Details';

function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
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
        formatter={(group: any) => ( // @ts-ignore
          <Details response={{ content: group.children }} />
        )}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_server.domain"
        properties="domain"
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_server.from"
        properties="from"
        width={150}
        formatter={getDate}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_server.to"
        properties="to"
        width={150}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="xyz"
        width={12}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
