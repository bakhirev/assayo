import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { getMaxValues } from 'ts/helpers/getMax';

interface IAuthorsProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Authors({ response, updateSort, rowsForExcel, mode }: IAuthorsProps) {
  if (!response) return null;

  const [weightedAverageMax] = getMaxValues(response, ['weightedAverage']);
  const workDaysOrder = [
    'page.team.pr.chart.1day',
    'page.team.pr.chart.3day',
    'page.team.pr.chart.7day',
    'page.team.pr.chart.14day',
    'page.team.pr.chart.30day',
    'page.team.pr.chart.more',
  ];

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
      fullScreenMode="author"
    >
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="page.team.pr.author"
        properties="author"
        width={250}
      />
      <Column
        title="page.team.pr.workDays"
        properties="workDays"
        template={(details: any) => (
          <LineChart
            details={details}
            order={workDaysOrder}
            limit={3}
          />
        )}
      />
      <Column
        title="page.team.pr.delayDays"
        properties="delayDays"
        template={(details: any) => (
          <LineChart
            details={details}
            order={workDaysOrder}
            limit={3}
          />
        )}
      />
      <Column
        properties="weightedAverage"
        template={ColumnTypes.SHORT_NUMBER}
      />
      <Column
        title="page.team.pr.middleTimeRelease"
        properties="weightedAverageDetails"
        width={300}
        template={(item: any, row: any) => (
          <LineChart
            value={row.weightedAverage}
            order={[
              'page.team.pr.work',
              'page.team.pr.delay',
            ]}
            suffix="page.team.pr.days"
            max={weightedAverageMax}
            details={{
              'page.team.pr.work': item.workDays,
              'page.team.pr.delay': item.delayDays,
            }}
          />
        )}
      />
    </DataView>
  );
}

Authors.defaultProps = {
  response: undefined,
};

export default Authors;
