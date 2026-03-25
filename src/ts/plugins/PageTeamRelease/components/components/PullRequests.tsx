import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView, PRLink, TaskLink } from 'ts/components/Layout';
import { LineChart } from 'ts/components/Charts';

import { getMaxValues } from 'ts/helpers/charts';
import { getDate } from 'ts/helpers/formatter';

interface PullRequestsProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function PullRequests({
  response,
  updateSort,
  rowsForExcel,
  mode,
}: PullRequestsProps) {
  if (!response) return null;

  const [workMax, reviewMax, awaitMax] = getMaxValues(response, ['daysWorkOnTask', 'daysInReview', 'daysAwaitRelease']);
  const max = Math.max(workMax, reviewMax, awaitMax);

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
        template={(value: string) => <TaskLink task={value} />}
        title="plugin.team_release.pr.task"
        properties="task"
        width={120}
      />
      <Column
        width={40}
        properties="prExternalId"
        template={(value: string) => <PRLink prId={value} />}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="daysWorkOnTask"
        width={40}
      />
      <Column
        isSortable
        title="plugin.team_release.pr.daysWorkOnTask"
        properties="daysWorkOnTask"
        minWidth={100}
        template={(value: any) => (
          <LineChart
            value={value}
            max={max}
            suffix="common.statistic.days"
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
        title="plugin.team_release.pr.daysInReview"
        properties="daysInReview"
        minWidth={100}
        template={(value: any) => (
          <LineChart
            value={value}
            max={max}
            suffix="common.statistic.days"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="daysAwaitRelease"
        width={40}
      />
      <Column
        isSortable
        title="plugin.team_release.pr.daysAwaitRelease"
        properties="daysAwaitRelease"
        minWidth={100}
        template={(value: any) => (
          <LineChart
            value={value}
            max={max}
            suffix="common.statistic.days"
          />
        )}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_release.pr.mergeDate"
        properties="dateMerge"
        formatter={getDate}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_release.pr.mergeAuthor"
        properties="author"
        width={250}
      />
    </DataView>
  );
}

PullRequests.defaultProps = {
  mode: undefined,
  response: undefined,
};

export default PullRequests;
