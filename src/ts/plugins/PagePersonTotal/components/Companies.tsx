import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { getDate } from 'ts/helpers/formatter';

function Companies({ response, updateSort, rowsForExcel, mode }: ViewProps) {
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
        title="plugin.person_total.email.company"
        properties="title"
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.person_total.from"
        properties="from"
        width={150}
        formatter={getDate}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.person_total.to"
        properties="to"
        width={150}
        formatter={getDate}
      />
    </DataView>
  );
}

Companies.defaultProps = {
  response: undefined,
};

export default Companies;
