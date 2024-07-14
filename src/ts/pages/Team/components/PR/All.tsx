import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import { PRLink, TaskLink } from 'ts/components/ExternalLink';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import { getMax } from 'ts/pages/Common/helpers/getMax';
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

  const workChart = getOptions({ max: getMax(response, 'workDays') });
  const delayChart = getOptions({ max: getMax(response, 'delayDays') });
  const commitsChart = getOptions({
    max: getMax(response, 'commits'),
    order: dataGripStore.dataGrip.author.list,
  });

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 2 : undefined}
    >
      {mode === 'print' ? (
        <Column
          isSortable
          title="page.team.pr.task"
          properties="task"
          width={120}
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
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.firstCommitTime"
        properties="beginTaskTime"
        formatter={getDate}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.lastCommitTime"
        properties="endTaskTime"
        formatter={getDate}
        width={130}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="workDays"
        width={40}
      />
      <Column
        isSortable
        title="page.team.pr.all.workDays"
        properties="workDays"
        minWidth={100}
        template={(value: any) => (
          <LineChart
            options={workChart}
            value={value}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="commits"
        width={40}
      />
      <Column
        isSortable
        title="page.team.pr.commits"
        properties="commitsByAuthors"
        minWidth={100}
        template={(details: any) => (
          <LineChart
            options={commitsChart}
            details={details}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="delayDays"
        width={40}
      />
      <Column
        isSortable
        title="page.team.pr.all.delayDays"
        properties="delayDays"
        minWidth={200}
        template={(value: any) => (
          <LineChart
            options={delayChart}
            value={value}
          />
        )}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.date"
        properties="milliseconds"
        formatter={getDate}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
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
