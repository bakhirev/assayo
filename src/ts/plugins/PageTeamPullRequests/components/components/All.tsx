import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import { Column, ColumnTypes } from 'ts/components/Table';
import { PRLink, TaskLink, DataView } from 'ts/components/Layout';
import { LineChart } from 'ts/components/Charts';

import { getMaxValues } from 'ts/helpers/getMax';
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

  const tasks = dataGripStore.dataGrip.tasks.statisticByName;
  const [workMax, delayMax] = getMaxValues(response, ['daysInWork', 'daysReview']);

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
      {mode === 'print' ? (
        <Column
          isSortable
          title="page.team.pr.task"
          properties="task"
          width={140}
        />
      ) : (
        <Column
          isSortable
          template={(value: string, row: any) => {
            return (
              <>
                <TaskLink task={value} />
                <PRLink prId={row?.prId} />
              </>
            );
          }}
          title="page.team.pr.task"
          properties="task"
          width={120}
        />
      )}
      <Column
        template={ColumnTypes.STRING}
        title="page.team.pr.firstCommitTime"
        formatter={(row: any) => getDate(tasks.get(row.task)?.from || row.beginTaskTime)}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="page.team.pr.lastCommitTime"
        properties="dateCreate"
        formatter={getDate}
        width={130}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="daysInWork"
        width={40}
      />
      <Column
        isSortable
        title="page.team.pr.all.workDays"
        properties="daysInWork"
        minWidth={170}
        template={(value: any) => (
          <LineChart
            value={value}
            max={workMax}
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="daysReview"
        width={40}
      />
      <Column
        isSortable
        title="page.team.pr.all.delayDays"
        properties="daysReview"
        minWidth={170}
        template={(value: any) => (
          <LineChart
            value={value}
            max={delayMax}
          />
        )}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="page.team.pr.date"
        properties="dateMerge"
        formatter={getDate}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="page.team.pr.mergeAuthor"
        properties="author"
        width={250}
      />
    </DataView>
  );
}

AllPR.defaultProps = {
  mode: undefined,
  response: undefined,
};

export default AllPR;
