import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import { COMMIT_TYPE } from 'ts/interfaces/Commit';
import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { getDate } from 'ts/helpers/formatter';

function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  const { text } = useTranslation();

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
        template={ColumnTypes.STRING}
        title="plugin.team_server.type.title"
        properties="type"
        formatter={(type: string) => {
          const name = type === COMMIT_TYPE.PR_BITBUCKET ? 'Bitbucket' : 'GitHub';
          return text('plugin.team_server.type.description', name);
        }}
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
