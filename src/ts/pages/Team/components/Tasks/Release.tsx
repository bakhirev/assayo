import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import IHashMap from 'ts/interfaces/HashMap';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { PRLink } from 'ts/components/ExternalLink';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import { getDate } from 'ts/helpers/formatter';

interface ReleaseProps {
  isCorrectPR?: IHashMap<boolean>;
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Release({ isCorrectPR, response, updateSort, rowsForExcel, mode }: ReleaseProps) {
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
        isFixed
        template={ColumnTypesEnum.STRING}
        title="page.team.release.title"
        properties="title"
        width={120}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.release.to"
        width={198}
        formatter={(row: any) => getDate(row.to || row.from)}
      />
      <Column
        isSortable
        minWidth={80}
        template={(row: any) => {
          const links = row?.prIds
            ?.filter((id: string) => isCorrectPR?.[id])
            ?.map((id: string) => (
              <PRLink
                key={id}
                prId={id}
              />
            ));
          return (<>{links}</>);
        }}
      />
    </DataView>
  );
}

Release.defaultProps = {
  response: undefined,
};

export default Release;
