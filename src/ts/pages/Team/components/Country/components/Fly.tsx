import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
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
        template={ColumnTypesEnum.STRING}
        title="page.team.country.travel.date"
        properties="from"
        formatter={getDate}
        width={142}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        width={40}
        formatter={() => '✈️'}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        width={72}
        properties="timezone"
      />
      <Column
        template={ColumnTypesEnum.STRING}
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
