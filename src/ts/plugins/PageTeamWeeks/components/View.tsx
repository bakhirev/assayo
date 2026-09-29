import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import ViewProps from 'ts/interfaces/ViewProps';
import { getHumanReadableWeek, getShortDateRange } from 'ts/helpers/formatter';
import statisticStore from 'ts/store/StatisticsByCommitsStore';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import { getMaxValues } from 'ts/helpers/charts';
import { StatisticsWeek } from "../../../helpers/StatisticsByCommits/components/week";

function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const [tasksMax, authorsMax, changesMax] = getMaxValues(response, [
    'totalTasks', 'totalAuthors', 'totalChanges',
  ]);

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
        isFixed
        isSortable="weekIndex"
        template={ColumnTypes.STRING}
        title="common.statistic.Date"
        properties="week"
        formatter={getHumanReadableWeek}
        width={260}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalTasks"
      />
      <Column
        isSortable="totalTasks"
        title="plugin.team_weeks.numberTasks"
        template={(row: any) => (
          <LineChart
            options={tasksMax}
            value={row.totalTasks}
            details={row.types}
            order={statisticStore.statisticsByCommits.type.list}
            suffix="common.statistic.tasks"
          />
        )}
        minWidth={200}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalAuthors"
      />
      <Column
        isSortable="totalAuthors"
        title="plugin.team_weeks.people"
        template={(row: any) => (
          <LineChart
            value={row.totalAuthors}
            details={row.tasksByAuthor}
            order={statisticStore.statisticsByCommits.author.list}
            max={authorsMax}
            suffix="common.statistic.tasks"
          />
        )}
        minWidth={200}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalChanges"
      />
      <Column
        isSortable="totalChanges"
        title="plugin.team_weeks.line"
        template={(row: any) => (
          <LineChart
            value={row.totalChanges}
            details={{
              'plugin.team_weeks.add': row?.added,
              'plugin.team_weeks.change': row?.changes,
              'plugin.team_weeks.remove': row?.removed,
            }}
            order={[
              'plugin.team_weeks.add',
              'plugin.team_weeks.change',
              'plugin.team_weeks.remove',
            ]}
            max={changesMax}
            suffix="lines"
          />
        )}
        minWidth={200}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalDays"
      />
      <Column
        isSortable="totalDays"
        title="common.statistic.days"
        template={(row: any) => (
          <LineChart
            value={row.totalDays}
            details={{
              'plugin.team_weeks.hasCommits': row?.totalDays,
              'plugin.team_weeks.hasNotCommits': row?.totalDaysWithoutCommits,
            }}
            order={[
              'plugin.team_weeks.hasCommits',
              'plugin.team_weeks.hasNotCommits',
            ]}
            suffix="common.statistic.days"
          />
        )}
        minWidth={200}
      />
      <Column
        title="plugin.team_weeks.lossesDetails"
        template={(details: IHashMap<number>) => (
          <LineChart
            details={details}
            order={statisticStore.statisticsByCommits.author.list}
            suffix="common.statistic.days"
          />
        )}
        formatter={(row: any) => {
          const detailsLikeArray = Object.entries(row?.authors)
            .map(([name, info]: any) => [name, info?.totalDaysWithoutCommits])
            .filter(([name, info]: any) => info);
          return Object.fromEntries(detailsLikeArray);
        }}
        minWidth={200}
      />
    </DataView>
  );
}

export default View;
