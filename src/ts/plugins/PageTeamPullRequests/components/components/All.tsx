import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import { Column, ColumnTypes } from 'ts/components/Table';
import { PRLink, DataView } from 'ts/components/Layout';
import { LineChart } from 'ts/components/Charts';

import { getMaxValues } from 'ts/helpers/charts';
import { getDate } from 'ts/helpers/formatter';

interface IPRViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function AllPR({
  response,
  updateSort,
  rowsForExcel,
  mode,
}: IPRViewProps) {
  if (!response) return null;

  const [daysInReviewMax, daysWorkOnTaskMax] = getMaxValues(response, ['daysInReview', 'daysWorkOnTask']);

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      mode={mode}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 2 : undefined}
      fullScreenMode="all"
    >
      <Column
        isSortable
        template={ColumnTypes.TASK}
        title="plugin.team_pull_requests.all.task"
        width={120}
        properties="task"
      />
      <Column
        title="plugin.team_pull_requests.all.pr"
        width={40}
        properties="prExternalId"
        template={(value: string) => <PRLink prId={value} />}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_pull_requests.all.message"
        properties="description"
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_pull_requests.all.dateCreate"
        properties="dateCreate"
        formatter={getDate}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_pull_requests.all.dateMerge"
        properties="dateMerge"
        formatter={getDate}
        width={130}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="daysWorkOnTask"
        width={40}
      />
      <Column
        isSortable
        title="plugin.team_pull_requests.all.daysWorkOnTask"
        properties="daysWorkOnTask"
        minWidth={170}
        template={(value: any) => (
          <LineChart
            value={value}
            max={daysWorkOnTaskMax}
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="daysInReview"
        width={40}
      />
      <Column
        isSortable
        title="plugin.team_pull_requests.all.daysInReview"
        properties="daysInReview"
        minWidth={170}
        template={(value: any) => (
          <LineChart
            value={value}
            max={daysInReviewMax}
          />
        )}
      />
    </DataView>
  );
}

AllPR.defaultProps = {
  mode: undefined,
  response: undefined,
};

export default AllPR;
