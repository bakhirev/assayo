import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import ViewProps from 'ts/interfaces/ViewProps';
import { getDate, getMoney, getShortNumber } from 'ts/helpers/formatter';
import statisticStore from 'ts/store/Statistics';
import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { getMaxValues } from 'ts/helpers/charts';

import AbsenceDetails from './AbsenceDetails';

export function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const [works, dismissed, staff, textWork, textLosses] = [
    'plugin.team_author.type.work',
    'plugin.team_author.type.dismissed',
    'plugin.team_author.type.staff',
    'plugin.team_author.worked',
    'plugin.team_author.losses',
  ];

  const [commitsMax, tasksMax] = getMaxValues(response, ['commits', 'totalTasks']);

  const getAbsenceByName = statisticStore.statisticsByCommits.absence.totalInfoByName;
  const formattedRows = response.content.map((row: any) => {
    const content = getAbsenceByName.get(row.author) || [];
    return { ...row, absence: content.length };
  });

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={formattedRows}
      sort={response.sort}
      updateSort={updateSort}
      mode={mode}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isFixed
        template={ColumnTypes.DETAILS}
        width={40}
        formatter={(row: any) => {
          const content = getAbsenceByName.get(row.author) || [];
          return (
            <AbsenceDetails rows={content} />
          );
        }}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        formatter={(row: any, index: number) => (index + 1)}
        width={40}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        properties="author"
        title="plugin.team_author.author"
        width={200}
      />
      <Column
        title="plugin.team_author.status"
        formatter={(row: any) => {
          if (row.isStaff) return staff;
          if (row.isDismissed) return dismissed;
          return works;
        }}
        template={ColumnTypes.TAGS}
        width={100}
      />
      <Column
        isSortable="company"
        title="plugin.team_author.company"
        properties="lastCompany"
        template={ColumnTypes.TAGS}
        width={150}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="firstCommit"
        title="plugin.team_author.firstCommit"
        width={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="lastCommit"
        title="plugin.team_author.lastCommit"
        width={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        title="plugin.team_author.daysAll"
        properties="totalDays"
        formatter={(value: number) => value || 1}
        width={90}
      />
      <Column
        isSortable="daysWorked"
        title="plugin.team_author.workedLosses"
        minWidth={300}
        template={(details: any) => (
          <LineChart
            details={details}
            order={[textWork, textLosses]}
            suffix="common.statistic.days"
          />
        )}
        formatter={(row: any) => ({
          [textWork]: row.totalDaysWithCommits,
          [textLosses]: row.totalDaysWithoutCommits,
        })}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalTasks"
      />
      <Column
        isSortable
        properties="totalTasks"
        title="plugin.team_author.tasks"
        minWidth={200}
        template={(value: number) => (
          <LineChart
            value={value}
            max={tasksMax}
            suffix="common.statistic.tasks"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        title="plugin.team_author.daysForTask"
        properties="totalTaskInDay"
        formatter={getShortNumber}
        width={120}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        title="plugin.team_author.scopes"
        properties="totalScopes"
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="commits"
      />
      <Column
        isSortable
        title="plugin.team_author.commits"
        properties="commits"
        minWidth={100}
        template={(value: number) => (
          <LineChart
            value={value}
            max={commitsMax}
          />
        )}
      />
      <Column
        title="plugin.team_author.types"
        properties="types"
        width={400}
        template={(details: IHashMap<number>) => (
          <LineChart
            details={details}
            order={statisticStore.statisticsByCommits.type.list}
            limit={1}
          />
        )}
      />
      <Column
        template={ColumnTypes.NUMBER}
        title="plugin.team_author.moneyAll"
        properties="totalMoney"
        formatter={getMoney}
      />
      <Column
        template={ColumnTypes.NUMBER}
        title="plugin.team_author.moneyWorked"
        properties="totalMoneyWorked"
        formatter={getMoney}
      />
      <Column
        template={ColumnTypes.NUMBER}
        title="plugin.team_author.moneyLosses"
        properties="totalMoneyLosses"
        formatter={getMoney}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
