import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import ViewProps from 'ts/interfaces/ViewProps';
import { getDate } from 'ts/helpers/formatter';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';

export function Employments({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  const { text } = useTranslation();
  if (!response) return null;

  const [works, dismissed, staff] = [
    text('common.statistic.work'),
    text('common.statistic.dismissed'),
    text('common.statistic.staff'),
  ];

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
        isFixed
        template={ColumnTypes.STRING}
        formatter={(row: any, index: number) => (index + 1)}
        width={40}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        properties="author"
        title="plugin.team_country.employments.author"
        width={158}
      />
      <Column
        formatter={(row: any) => {
          if (row.isStaff) return staff;
          if (row.isDismissed) return dismissed;
          return works;
        }}
        template={ColumnTypes.TAGS}
        width={140}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="firstCommit"
        width={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="lastCommit"
        width={130}
        formatter={getDate}
      />
    </DataView>
  );
}

Employments.defaultProps = {
  response: undefined,
};

export default Employments;
