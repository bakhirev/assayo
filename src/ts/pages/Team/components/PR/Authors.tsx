import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import { getMax } from 'ts/pages/Common/helpers/getMax';

interface IAuthorsProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Authors({ response, updateSort, rowsForExcel, mode }: IAuthorsProps) {
  if (!response) return null;

  const timeChart = getOptions({
    order: [
      'page.team.pr.chart.1day',
      'page.team.pr.chart.3day',
      'page.team.pr.chart.7day',
      'page.team.pr.chart.14day',
      'page.team.pr.chart.30day',
      'page.team.pr.chart.more',
    ],
    limit: 3,
  });

  const weightedAverageChart = getOptions({
    max: getMax(response, 'weightedAverage'),
    order: [
      'page.team.pr.work',
      'page.team.pr.delay',
    ],
    suffix: 'page.team.pr.days',
  });

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
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.author"
        properties="author"
        width={250}
      />
      <Column
        title="page.team.pr.workDays"
        properties="workDays"
        template={(details: any) => (
          <LineChart
            options={timeChart}
            details={details}
          />
        )}
      />
      <Column
        title="page.team.pr.delayDays"
        properties="delayDays"
        template={(details: any) => (
          <LineChart
            options={timeChart}
            details={details}
          />
        )}
      />
      <Column
        properties="weightedAverage"
        template={ColumnTypesEnum.SHORT_NUMBER}
      />
      <Column
        title="page.team.pr.middleTimeRelease"
        properties="weightedAverageDetails"
        width={300}
        template={(item: any, row: any) => (
          <LineChart
            options={weightedAverageChart}
            value={row.weightedAverage}
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
