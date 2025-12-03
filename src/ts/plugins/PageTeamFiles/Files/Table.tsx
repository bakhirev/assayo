import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { IDirtyFile } from 'ts/interfaces/FileInfo';
import dataGripStore from 'ts/store/DataGrip';

import { Table, Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import { getMaxValues } from 'ts/helpers/getMax';
import { getDate } from 'ts/helpers/formatter';

import treeStore from '../store';
import Tasks from './Tasks';

interface IViewProps {
  response?: IPagination<any>;
}

function View({ response }: IViewProps) {
  if (!response) return null;

  const [linesMax, tasksMax, daysMax] = getMaxValues(response, ['lines', 'totalTasks', 'totalDays']);

  return (
    <Table
      rows={response.content}
      disabledRow={(row: any) => {
        if (row?.title === '..') return false;
        else return true;
        // TODO: not work
        const limit = treeStore.minCommits || 0;
        const name = dataGripStore.dataGrip.author.list[treeStore.authorId || ''] || '';
        const author = row.file?.authors[name];
        const commits = author?.commits || 0;
        return (treeStore.authorId && !author) || (commits < limit);
      }}
    >
      <Column
        isFixed
        template={ColumnTypes.DETAILS}
        width={40}
        properties="tasks"
        formatter={(row: any) => {
          const content = Array.from(row?.tasks)
            .reverse()
            .map((taskId: any) => dataGripStore.dataGrip.tasks.statisticByName.get(taskId))
            .filter(v => v);
          return (
            <Tasks // @ts-ignore
              response={{ content }}
              mode="details"
            />
          );
        }}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        formatter={(row: any) => row?.content ? `📁 ${row?.name}` : `📄 ${row?.name}`}
        minWidth={170}
        onClick={(row: any) => {
          if (!row.content) return;
          treeStore.updateFilter('selectedPath', [...row.path, row.name]);
        }}
      />
      <Column
        isSortable
        width={60}
        properties="lines"
        template={ColumnTypes.SHORT_NUMBER}
      />
      <Column
        isSortable
        properties="lines"
        title="page.team.tree.totalLines"
        minWidth={100}
        template={(value: any) => (
          <LineChart
            value={value}
            max={linesMax}
            suffix="page.team.tree.line"
          />
        )}
      />
      <Column
        isSortable
        width={50}
        properties="totalTasks"
        template={ColumnTypes.SHORT_NUMBER}
      />
      <Column
        isSortable
        properties="totalTasks"
        title="page.team.tree.totalTasks"
        minWidth={100}
        template={(value: any) => (
          <LineChart
            value={value}
            max={tasksMax}
            suffix="page.team.tree.tasks"
          />
        )}
      />
      <Column
        isSortable
        width={50}
        properties="totalDays"
        template={ColumnTypes.SHORT_NUMBER}
      />
      <Column
        isSortable
        properties="totalDays"
        title="page.team.tree.totalDays"
        minWidth={100}
        template={(value: any) => (
          <LineChart
            value={value}
            max={daysMax}
            suffix="page.team.tree.days"
          />
        )}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="page.team.pr.firstCommitTime"
        formatter={(item: any) => getDate(item?.firstCommit?.timestamp)}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="page.team.pr.author"
        formatter={(item: any) => item?.firstCommit?.author || ''}
        width={150}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="page.team.pr.lastCommitTime"
        formatter={(item: any) => getDate(item?.lastCommit?.timestamp)}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="page.team.pr.author"
        formatter={(item: any) => item?.lastCommit?.author || ''}
        width={150}
      />
      <Column
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            value={100}
            details={{
              'page.team.tree.linesAdded': file?.addedLines || 0,
              'page.team.tree.linesRemoved': file?.removedLines || 0,
              'page.team.tree.linesChanged': file?.changedLines || 0,
            }}
            order={[
              'page.team.tree.linesAdded',
              'page.team.tree.linesChanged',
              'page.team.tree.linesRemoved',
            ]}
            suffix="page.team.tree.line"
          />
        )}
      />
      <Column
        title="page.team.tree.add"
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            value={100}
            details={file?.addedByAuthorInPercent}
            order={dataGripStore.dataGrip.author.list}
            suffix="page.team.tree.line"
          />
        )}
      />
      <Column
        title="page.team.tree.change"
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            value={100}
            details={file?.changedByAuthorInPercent}
          />
        )}
      />
      <Column
        title="page.team.tree.remove"
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            value={100}
            details={file?.removedByAuthorInPercent}
          />
        )}
      />
    </Table>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
