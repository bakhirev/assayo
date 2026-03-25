import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { IDirtyFile } from 'ts/interfaces/FileInfo';
import statisticStore from 'ts/store/Statistics';

import type Filter from 'ts/components/Layout/Search/interfaces/Filter';
import { LineChart } from 'ts/components/Charts';
import { Table, Column, ColumnTypes } from 'ts/components/Table';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { getShortMoney } from 'ts/helpers/formatter';

import { CellWithSelect, FolderCell, FileCell } from './components/FolderFile';
import Tasks from './components/Tasks';
import { isFiltersMatches, getFilteredTasks } from './helpers';

interface IViewProps {
  response?: IPagination<any>;
  filters?: Filter;
  setPath: (value: string[]) => void;
}

function View({ response, filters, setPath }: IViewProps) {
  if (!response) return null;

  const [linesAdded, linesChanged, linesRemoved] = [
    'plugin.team_files.table.chart.linesAdded',
    'plugin.team_files.table.chart.linesChanged',
    'plugin.team_files.table.chart.linesRemoved',
  ];
  const formattedRows = response.content.map((row) => ({
    ...row,
    isSelected: isFiltersMatches(row, filters),
  }));

  return (
    <Table rows={formattedRows}>
      <Column
        isFixed
        template={ColumnTypes.DETAILS}
        width={40}
        formatter={(row: any) => {
          const content = getFilteredTasks(row?.tasks, filters);
          return (
            <FakeDataLoader content={content}>
              <Tasks/>
              <Pagination/>
            </FakeDataLoader>
          );
        }}
      />
      <Column
        isFixed
        minWidth={170}
        template={(row: any) => {
          return row?.content ? (
            <FolderCell
              name={row?.name}
              isSelected={row?.isSelected}
            />
          ) : (
            <FileCell
              name={row?.name}
              isSelected={row?.isSelected}
            />
          );
        }}
        onClick={(row: any) => {
          if (!row.content) return;
          setPath([...row.path, row.name]);
        }}
      />
      <Column
        isSortable
        width={100}
        title="plugin.team_files.table.lines"
        template={(row: any) => (
          <CellWithSelect isSelected={row.isSelected}>
            {row?.lines}
          </CellWithSelect>
        )}
      />
      <Column
        isSortable
        width={100}
        title="plugin.team_files.table.tasks"
        template={(row: any) => (
          <CellWithSelect isSelected={row.isSelected}>
            {row?.totalTasks}
          </CellWithSelect>
        )}
      />
      <Column
        isSortable
        width={100}
        title="plugin.team_files.table.days"
        template={(row: any) => (
          <CellWithSelect isSelected={row.isSelected}>
            {row?.totalDays}
          </CellWithSelect>
        )}
      />
      <Column
        width={100}
        title="plugin.team_files.table.workedDays"
        template={(row: any) => (
          <CellWithSelect isSelected={row.isSelected}>
            {row?.content ? row?.totalDaysByAuthor : row?.totalDays}
          </CellWithSelect>
        )}
      />
      <Column
        width={150}
        title="plugin.team_files.table.money"
        properties="money"
        template={ColumnTypes.SHORT_NUMBER}
        formatter={(value: number) => getShortMoney(value)}
      />
      <Column
        isSortable
        title="plugin.team_files.table.workedDays"
        minWidth={200}
        template={(row: any) => {
          if (!row?.content) return null;
          return (
            <LineChart
              details={row?.daysByAuthor}
              order={statisticStore.statisticsByCommits.author.list}
              suffix="common.statistic.days"
            />
          );
        }}
      />
      <Column
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            details={{
              [linesAdded]: file?.addedLines || 0,
              [linesRemoved]: file?.removedLines || 0,
              [linesChanged]: file?.changedLines || 0,
            }}
            order={[linesAdded, linesChanged, linesRemoved]}
            suffix="plugin.team_files.table.chart.line"
          />
        )}
      />
      <Column
        title="plugin.team_files.table.add"
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            details={file?.addedLinesByAuthor}
            order={statisticStore.statisticsByCommits.author.list}
            suffix="plugin.team_files.table.chart.line"
          />
        )}
      />
      <Column
        title="plugin.team_files.table.change"
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            details={file?.changedLinesByAuthor}
            order={statisticStore.statisticsByCommits.author.list}
            suffix="plugin.team_files.table.chart.line"
          />
        )}
      />
      <Column
        title="plugin.team_files.table.remove"
        minWidth={200}
        template={(file: IDirtyFile) => (
          <LineChart
            details={file?.removedLinesByAuthor}
            order={statisticStore.statisticsByCommits.author.list}
            suffix="plugin.team_files.table.chart.line"
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
