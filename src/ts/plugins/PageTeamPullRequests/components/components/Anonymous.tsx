import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import { Column, ColumnTypes } from 'ts/components/Table';
import { PRLink, DataView } from 'ts/components/Layout';
import { getDate } from 'ts/helpers/formatter';

interface IPRViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Anonymous({
  response,
  updateSort,
  rowsForExcel,
  mode,
}: IPRViewProps) {
  if (!response) return null;

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      mode={mode}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 2 : undefined}
      fullScreenMode="anonymous"
    >
      <Column
        isSortable
        properties="prExternalId"
        width={80}
        template={(prExternalId: string) => <PRLink prId={prExternalId} />}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_pull_requests.anonymous.date"
        properties="dateMerge"
        formatter={getDate}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_pull_requests.anonymous.author"
        properties="author"
        width={200}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_pull_requests.anonymous.message"
        properties="description"
      />
    </DataView>
  );
}

Anonymous.defaultProps = {
  mode: undefined,
  response: undefined,
};

export default Anonymous;
