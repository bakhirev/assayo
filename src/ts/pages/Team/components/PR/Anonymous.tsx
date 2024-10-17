import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import { PRLink } from 'ts/components/ExternalLink';
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
      {mode === 'print' ? (
        <Column
          isSortable
          properties="prId"
          width={140}
        />
      ) : (
        <Column
          isSortable
          template={(value: string, row: any) => {
            return (
              <PRLink prId={row?.prId} />
            );
          }}
          properties="prId"
          width={120}
        />
      )}
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.date"
        properties="dateMerge"
        formatter={getDate}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.mergeAuthor"
        properties="author"
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.branch"
        properties="branch"
      />
    </DataView>
  );
}

Anonymous.defaultProps = {
  mode: undefined,
  response: undefined,
};

export default Anonymous;
