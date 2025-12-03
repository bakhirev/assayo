import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import { IPagination } from 'ts/interfaces/Pagination';
import { getShortDateRange } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import { getMaxValues } from 'ts/helpers/getMax';

interface ViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

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
        title="page.team.week.date"
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
        title="page.team.week.numberTasks"
        template={(row: any) => (
          <LineChart
            options={tasksMax}
            value={row.tasks}
            details={row.types}
            order={dataGripStore.dataGrip.type.list}
            suffix="page.team.week.tasks"
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
        title="page.team.week.people"
        template={(row: any) => (
          <LineChart
            value={row.authorsLength}
            details={row.authors}
            order={dataGripStore.dataGrip.author.list}
            max={authorsMax}
            suffix="page.team.week.tasks"
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
        title="page.team.week.line"
        template={(row: any) => (
          <LineChart
            value={row.changesLength}
            details={{
              'page.team.week.add': row?.changes?.added,
              'page.team.week.change': row?.changes?.changes,
              'page.team.week.remove': row?.changes?.removed,
            }}
            order={[
              'page.team.week.add',
              'page.team.week.change',
              'page.team.week.remove',
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
        title="page.team.week.days"
        template={(row: any) => (
          <LineChart
            details={{ // TODO: ошибка суммы, т.к. 5 дневка не у всех. Нужно по автору перебирать.
              'page.team.week.hasCommits': row?.workDaysTotal,
              'page.team.week.hasNotCommits': row?.authorsLength * 5 - row?.workDaysTotal,
            }}
            order={[
              'page.team.week.hasCommits',
              'page.team.week.hasNotCommits',
            ]}
            suffix="page.team.week.days"
          />
        )}
        minWidth={200}
      />
      <Column
        title="page.team.week.lossesDetails"
        template={(details: IHashMap<number>) => (
          <LineChart
            details={details}
            order={dataGripStore.dataGrip.author.list}
            suffix="page.team.week.days"
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
