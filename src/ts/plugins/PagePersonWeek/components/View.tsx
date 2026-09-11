import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import { IPagination } from 'ts/interfaces/Pagination';
import { getShortDateRange, getShortNumber } from 'ts/helpers/formatter';
import statisticStore from 'ts/store/StatisticsByCommitsStore';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import { getMaxSubValues } from 'ts/helpers/charts';

interface ViewProps {
  name: string;
  response?: IPagination<any>;
  updateSort?: Function;
  mode?: string;
}

function View({ response, updateSort, name, mode }: ViewProps) {
  if (!response) return null;

  const [typeMax, taskInDayMax] = getMaxSubValues(response, ['authors', 'taskInDay'], name);

  return (
    <DataView
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isFixed
        template={ColumnTypes.STRING}
        title="page.person.week.date"
        properties="timestamp"
        formatter={getShortDateRange}
        width={200}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="authors"
        formatter={(authors: IHashMap<number>) => authors[name] || 0}
      />
      <Column
        title="page.person.week.tasks"
        template={(row: any) => (
          <LineChart
            order={statisticStore.statisticsByCommits.type.list}
            max={typeMax}
            value={row.authors[name]}
            details={row.typeByAuthor[name]}
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="workDays"
        formatter={(workDays: IHashMap<number>) => workDays[name] || 0}
      />
      <Column
        title="page.person.week.workDays"
        template={([work, week]: any) => (
          <LineChart
            value={work + week}
            max={7}
            details={{
              'page.person.week.workDay': work,
              'page.person.week.weekends': week,
            }}
            order={[
              'page.person.week.workDay',
              'page.person.week.weekends',
            ]}
            suffix="page.person.week.days"
          />
        )}
        formatter={(row: any) => ( // TODO: не верно, тут сумма, а сб или вс не факт. Он мог прогулять пн, но работать в вс
          row?.workDays[name] > 5
            ? [5, row?.workDays[name] - 5]
            : [row?.workDays[name], 0]
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="taskInDay"
        formatter={(taskInDay: IHashMap<number>) => getShortNumber(taskInDay[name] || 0)}
      />
      <Column
        title="page.person.week.taskInDay"
        properties="taskInDay"
        template={(taskInDay: any) => (
          <LineChart
            max={taskInDayMax}
            value={taskInDay[name]}
            suffix="common.statistic.tasks"
          />
        )}
      />
    </DataView>
  );
}

export default View;
