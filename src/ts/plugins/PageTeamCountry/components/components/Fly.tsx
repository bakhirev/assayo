import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { getDate } from 'ts/helpers/formatter';

interface TravelProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Fly({ response, updateSort, rowsForExcel, mode }: TravelProps) {
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
        title="page.team.country.travel.date"
        properties="from"
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
        properties="timezone"
      />
      <Column
        template={ColumnTypes.STRING}
        properties="country"
        title="page.team.country.travel.country"
      />
    </DataView>
  );
}

Fly.defaultProps = {
  response: undefined,
};

export default Fly;
