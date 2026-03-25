import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { PRLink, DataView } from 'ts/components/Layout';
import { getDate, getFullTime } from 'ts/helpers/formatter';

function Release({ response, updateSort, rowsForExcel, mode }: ViewProps) {
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
        template={ColumnTypes.STRING}
        title="plugin.team_commits.info.release.title"
        width={120}
        properties="releaseTitle"
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_commits.info.release.releaseDateMerge"
        width={150}
        properties="releaseDateMerge"
        formatter={getDate}
      />
      <Column
        width={80}
        template={(row: any) => (
          <PRLink
            key={row.prId}
            prId={row.prExternalId}
          />
        )}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_commits.info.release.prDateMerge"
        properties="prDateMerge"
        formatter={getFullTime}
      />
    </DataView>
  );
}

Release.defaultProps = {
  response: undefined,
};

export default Release;
