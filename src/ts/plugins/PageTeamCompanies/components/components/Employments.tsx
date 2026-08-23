import React from 'react';
import { observer } from 'mobx-react-lite';

import { IPagination } from 'ts/interfaces/Pagination';
import { getDate } from 'ts/helpers/formatter';
import { getMaxValues } from 'ts/helpers/charts';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { LineChart } from 'ts/components/Charts';
import { UiKitTagMode } from 'ts/components/UiKit/components/Tag';
import statisticStore from 'ts/store/StatisticsByCommitsStore';

interface EmploymentsProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

const Employments = observer(({
  response,
  updateSort,
  rowsForExcel,
  mode,
}: EmploymentsProps): React.ReactElement | null => {
  const totalInfoByName = statisticStore.statisticsByCommits.author.totalInfoByName;

  if (!response) return null;

  const [works, dismissed, staff] = [
    'plugin.team_departments.author.work',
    'plugin.team_departments.author.dismissed',
    'plugin.team_departments.author.staff',
  ];

  const [daysMax, tasksMax] = getMaxValues(response, ['totalDaysWorked', 'totalTasks']);

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      mode={mode}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isFixed
        width={200}
        template={ColumnTypes.STRING}
        properties="author"
        title="plugin.team_companies.employments.author"
      />
      <Column
        properties="author"
        width={140}
        title="plugin.team_companies.employments.status"
        formatter={(name: string) => {
          const author = totalInfoByName.get(name);
          if (author?.isStaff) return { title: staff, mode: UiKitTagMode.WARNING };
          if (author?.isDismissed) return { title: dismissed, mode: UiKitTagMode.ERROR };
          return { title: works, mode: UiKitTagMode.SUCCESS };
        }}
        template={ColumnTypes.TAGS}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        properties="firstCommit"
        width={130}
        formatter={getDate}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        properties="lastCommit"
        formatter={getDate}
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalDaysWorked"
        width={90}
      />
      <Column
        isSortable
        width={150}
        title="plugin.team_companies.employments.totalDays"
        template={(row: any) => (
          <LineChart
            value={row.totalDaysWorked}
            max={daysMax}
            suffix="common.statistic.days"
          />
        )}
      />
      <Column
        isSortable
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalTasks"
        width={90}
      />
      <Column
        isSortable
        properties="totalTasks"
        title="plugin.team_companies.employments.totalTasks"
        template={(value: number) => (
          <LineChart
            value={value}
            max={tasksMax}
            suffix="common.statistic.tasks"
          />
        )}
      />
    </DataView>
  );
});

export default Employments;
