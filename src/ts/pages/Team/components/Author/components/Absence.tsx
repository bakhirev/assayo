import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { getDate } from 'ts/helpers/formatter';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import UiKitTags from 'ts/components/UiKit/components/Tags';

import { getMax } from 'ts/pages/Common/helpers/getMax';

interface AbsenceProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

export function Absence({ response, updateSort, rowsForExcel, mode }: AbsenceProps) {
  if (!response) return null;

  const durationChart = getOptions({ max: getMax(response, 'duration'), suffix: 'page.team.author.days' });

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
        template={ColumnTypesEnum.STRING}
        formatter={(row: any, index: number) => (index + 1)}
        width={40}
      />
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        properties="author"
        title="page.team.pr.author"
        minWidth={200}
      />
      <Column
        title="тип"
        formatter={(row: any) => {
          return row.duration > 40
            ? 'page.team.author.absence.transfer'
            : 'page.team.author.absence.vacation';
        }}
        template={(value: string) => <UiKitTags value={value} />}
        minWidth={200}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.author.absence.from"
        properties="from"
        minWidth={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.author.absence.to"
        properties="to"
        minWidth={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="duration"
      />
      <Column
        isSortable
        title="page.team.author.absence.duration"
        properties="duration"
        minWidth={200}
        template={(value: number) => (
          <LineChart
            options={durationChart}
            value={value}
          />
        )}
      />
    </DataView>
  );
}

Absence.defaultProps = {
  response: undefined,
};

export default Absence;
