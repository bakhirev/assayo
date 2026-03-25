import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { getDate } from 'ts/helpers/formatter';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { getMaxValues } from 'ts/helpers/charts';

export function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const [durationMax] = getMaxValues(response, ['duration']);

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
        title="тип"
        formatter={(row: any) => {
          return row.duration > 40
            ? 'plugin.person_vacation.details.transfer'
            : 'plugin.person_vacation.details.vacation';
        }}
        template={ColumnTypes.TAGS}
        minWidth={200}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.person_vacation.details.from"
        minWidth={130}
        formatter={(row: any) => getDate(row.from.milliseconds)}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.person_vacation.details.to"
        minWidth={130}
        formatter={(row: any) => getDate(row.to.milliseconds)}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="duration"
      />
      <Column
        isSortable
        title="plugin.person_vacation.details.duration"
        properties="duration"
        minWidth={200}
        template={(value: number) => (
          <LineChart
            value={value}
            max={durationMax}
            suffix="common.statistic.days"
          />
        )}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
