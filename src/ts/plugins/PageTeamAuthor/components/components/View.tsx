import React from 'react';
import { useTranslation } from 'react-i18next';

import ICommit from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';
import { IPagination } from 'ts/interfaces/Pagination';
import { getDate, getMoney, getShortNumber } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import UiKitTags from 'ts/components/UiKit/components/Tags';
import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import { getMaxSubValues, getMaxValues } from 'ts/helpers/getMax';

import AbsenceDetails from './AbsenceDetails';

interface ViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

export function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  const { t } = useTranslation();
  if (!response) return null;

  const [works, dismissed, staff] = [
    t('page.team.author.type.work'),
    t('page.team.author.type.dismissed'),
    t('page.team.author.type.staff'),
  ];

  const textWork = t('page.team.author.worked');
  const textLosses = t('page.team.author.losses');
  const [tasksMax] = getMaxSubValues(response, ['tasks']);
  const [commitsMax] = getMaxValues(response, ['commits']);

  const formattedRows = response.content.map((row: any) => {
    const content = dataGripStore.dataGrip.absence.statisticByName.get(row.author) || [];
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
        properties="absence"
        formatter={(row: any) => {
          const content = dataGripStore.dataGrip.absence.statisticByName.get(row.author) || [];
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
        title="page.team.pr.author"
        width={200}
      />
      <Column
        title="page.team.author.status"
        formatter={(row: any) => {
          if (row.isStaff) return staff;
          if (row.isDismissed) return dismissed;
          return works;
        }}
        template={(value: string) => <UiKitTags value={value} />}
        width={100}
      />
      <Column
        isSortable="company"
        title="page.team.author.company"
        properties="lastCompany"
        template={(value: string) => <UiKitTags value={value} />}
        width={150}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="firstCommit"
        title="page.team.author.firstCommit"
        width={130}
        formatter={(commit: ICommit) => getDate(commit.timestamp)}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="lastCommit"
        title="page.team.author.lastCommit"
        width={130}
        formatter={(commit: ICommit) => getDate(commit.timestamp)}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        title="page.team.author.daysAll"
        properties="daysAll"
        formatter={(value: number) => value || 1}
        width={90}
      />
      <Column
        isSortable="daysWorked"
        title="page.team.author.workedLosses"
        minWidth={300}
        template={(details: any) => (
          <LineChart
            details={details}
            order={[textWork, textLosses]}
            suffix="page.team.author.days"
          />
        )}
        formatter={(row: any) => {
          return { [textWork]: row.daysWorked, [textLosses]: row.daysLosses };
        }}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="tasks"
        formatter={(tasks: string[]) => (tasks?.length || 0)}
      />
      <Column
        isSortable
        properties="tasks"
        title="page.team.author.tasks"
        minWidth={200}
        template={(value: number) => (
          <LineChart
            value={value}
            max={tasksMax}
            suffix="page.team.author.tasksSmall"
          />
        )}
        formatter={(tasks: any) => (tasks?.length || 0)}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        title="page.team.author.daysForTask"
        properties="daysForTask"
        formatter={getShortNumber}
        width={120}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        title="page.team.author.scopes"
        properties="scopes"
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="commits"
      />
      <Column
        isSortable
        title="page.team.author.commits"
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
        title="page.team.author.types"
        properties="types"
        width={400}
        template={(details: IHashMap<number>) => (
          <LineChart
            details={details}
            order={dataGripStore.dataGrip.type.list}
            limit={1}
          />
        )}
      />
      <Column
        template={ColumnTypes.NUMBER}
        title="page.team.author.moneyAll"
        properties="moneyAll"
        formatter={getMoney}
      />
      <Column
        template={ColumnTypes.NUMBER}
        title="page.team.author.moneyWorked"
        properties="moneyWorked"
        formatter={getMoney}
      />
      <Column
        template={ColumnTypes.NUMBER}
        title="page.team.author.moneyLosses"
        properties="moneyLosses"
        formatter={getMoney}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
