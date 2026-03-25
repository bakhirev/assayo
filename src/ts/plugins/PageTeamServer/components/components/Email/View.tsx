import React from 'react';

import { EmailType } from 'ts/interfaces/Commit';
import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView, GithubLink } from 'ts/components/Layout';
import { getDate } from 'ts/helpers/formatter';

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
        isSortable
        title="plugin.team_server.email.type"
        properties="type"
        formatter={(value: number) => {
          return {
            [EmailType.UNKNOWN]: '',
            [EmailType.ACCOUNT]: 'TECH ACCOUNT',
            [EmailType.GITHUB]: 'GITHUB',
            [EmailType.MAIL]: 'PERSONAL',
            [EmailType.COMPANY]: 'CORPORATE',
            [EmailType.NETWORK]: 'NETWORK',
            [EmailType.DEVICE]: 'DEVICE',
          }[value];
        }}
        template={ColumnTypes.TAGS}
        width={150}
      />
      <Column
        isSortable
        title="plugin.team_server.email.company"
        properties="company"
        template={ColumnTypes.TAGS}
        width={150}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_server.email.author"
        properties="author"
        width={200}
      />
      <Column
        isSortable
        title="plugin.team_server.email.email"
        properties="email"
        template={(value: string, row: any) => (
          row.type === EmailType.GITHUB
            ? <GithubLink email={value}/>
            : value
        )}
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
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
