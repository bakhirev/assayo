import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { getMaxValues } from 'ts/helpers/charts';
import { getShortNumber } from 'ts/helpers/formatter';

interface ViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
  order: string[];
}

function View({ response, updateSort, rowsForExcel, mode, order }: ViewProps) {
  if (!response) return null;

  const [daysTotalValueMax] = getMaxValues(response, ['daysTotalValue']);

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
        title="plugin.team_pull_requests.author.author"
        properties="author"
        width={250}
      />
      <Column
        title="plugin.team_pull_requests.author.daysWorkOnTask"
        properties="daysWorkOnTask"
        template={(details: any) => (
          <LineChart
            details={details}
            order={order}
            suffix="plugin.team_pull_requests.chart.suffix"
            limit={3}
          />
        )}
      />
      <Column
        title="plugin.team_pull_requests.author.daysInReview"
        properties="daysInReview"
        template={(details: any) => (
          <LineChart
            details={details}
            order={order}
            suffix="plugin.team_pull_requests.chart.suffix"
            limit={3}
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="daysTotalValue"
        formatter={getShortNumber}
        width={40}
      />
      <Column
        isSortable
        properties="daysTotalValue"
        title="plugin.team_pull_requests.author.middleTimeRelease"
        width={300}
        template={(value:any, row: any) => (
          <LineChart
            value={value}
            order={[
              'plugin.team_pull_requests.author.work',
              'plugin.team_pull_requests.author.review',
            ]}
            suffix="common.statistic.days"
            max={daysTotalValueMax}
            details={row.daysTotalDetails}
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
