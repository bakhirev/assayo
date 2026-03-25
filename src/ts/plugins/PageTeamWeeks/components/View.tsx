import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import ViewProps from 'ts/interfaces/ViewProps';
import { getShortDateRange } from 'ts/helpers/formatter';
import statisticStore from 'ts/store/Statistics';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import { getMaxValues } from 'ts/helpers/charts';

function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const [tasksMax, authorsMax, changesMax] = getMaxValues(response, [
    'tasks', 'authorsLength', 'changesLength',
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
        template={ColumnTypes.STRING}
        title="common.statistic.Date"
        properties="timestamp"
        formatter={getShortDateRange}
        width={260}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="tasks"
      />
      <Column
        isSortable="tasks"
        title="plugin.team_weeks.numberTasks"
        template={(row: any) => (
          <LineChart
            options={tasksMax}
            value={row.tasks}
            details={row.types}
            order={statisticStore.statisticsByCommits.type.list}
            suffix="common.statistic.tasks"
          />
        )}
        minWidth={200}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="authorsLength"
      />
      <Column
        isSortable="authorsLength"
        title="plugin.team_weeks.people"
        template={(row: any) => (
          <LineChart
            value={row.authorsLength}
            details={row.authors}
            order={statisticStore.statisticsByCommits.author.list}
            max={authorsMax}
            suffix="common.statistic.tasks"
          />
        )}
        minWidth={200}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="changesLength"
      />
      <Column
        isSortable="changesLength"
        title="plugin.team_weeks.line"
        template={(row: any) => (
          <LineChart
            value={row.changesLength}
            details={{
              'plugin.team_weeks.add': row?.changes?.added,
              'plugin.team_weeks.change': row?.changes?.changes,
              'plugin.team_weeks.remove': row?.changes?.removed,
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
        properties="workDaysTotal"
      />
      <Column
        isSortable="workDaysTotal"
        title="common.statistic.days"
        template={(row: any) => (
          <LineChart
            details={{ // TODO: ошибка суммы, т.к. 5 дневка не у всех. Нужно по автору перебирать.
              'plugin.team_weeks.hasCommits': row?.workDaysTotal,
              'plugin.team_weeks.hasNotCommits': row?.authorsLength * 5 - row?.workDaysTotal,
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
          const detailsLikeArray = Object.entries(row?.workDays).map(([name, days]: any) => [name, 5 - days]);
          return Object.fromEntries(detailsLikeArray.filter((nameDays: any) => nameDays[1] > 0));
        }}
        minWidth={200}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
