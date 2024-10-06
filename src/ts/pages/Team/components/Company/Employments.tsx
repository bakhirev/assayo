import React from 'react';
import { useTranslation } from 'react-i18next';

import ICommit from 'ts/interfaces/Commit';
import { IPagination } from 'ts/interfaces/Pagination';
import { getDate, getMoney } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import UiKitTags from 'ts/components/UiKit/components/Tags';
import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

interface EmploymentsProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

export function Employments({ response, updateSort, rowsForExcel, mode }: EmploymentsProps) {
  const { t } = useTranslation();
  if (!response) return null;

  const [works, dismissed, staff] = [
    t('page.team.author.type.work'),
    t('page.team.author.type.dismissed'),
    t('page.team.author.type.staff'),
  ];

  const textWork = t('page.team.author.worked');
  const textLosses = t('page.team.author.losses');
  const daysWorked = getOptions({ order: [textWork, textLosses], suffix: 'page.team.author.days' });
  const typeChart = getOptions({
    suffix: 'page.team.author.tasksSmall',
    order: dataGripStore.dataGrip.type.list,
  });

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
        template={ColumnTypesEnum.STRING}
        formatter={(row: any, index: number) => (index + 1)}
        width={40}
      />
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        properties="author"
        title="page.team.pr.author"
        width={158}
      />
      <Column
        formatter={(row: any) => {
          if (row.isStaff) return staff;
          if (row.isDismissed) return dismissed;
          return works;
        }}
        template={(value: string) => <UiKitTags value={value} />}
        width={100}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        properties="firstCommit"
        width={130}
        formatter={(commit: ICommit) => getDate(commit.timestamp)}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        properties="lastCommit"
        width={130}
        formatter={(commit: ICommit) => getDate(commit.timestamp)}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="daysAll"
        formatter={(value: number) => value || 1}
        width={90}
      />
      <Column
        isSortable="daysWorked"
        width={150}
        template={(details: any) => (
          <LineChart
            options={daysWorked}
            details={details}
          />
        )}
        formatter={(row: any) => {
          return { [textWork]: row.daysWorked, [textLosses]: row.daysLosses };
        }}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="tasks"
        formatter={(tasks: string[]) => (tasks?.length || 0)}
        width={90}
      />
      <Column
        isSortable
        width={150}
        template={(row: any) => (
          <LineChart
            options={typeChart}
            details={row.types}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.NUMBER}
        title="page.team.author.moneyAll"
        properties="moneyAll"
        formatter={getMoney}
      />
      <Column
        template={ColumnTypesEnum.NUMBER}
        title="page.team.author.moneyWorked"
        properties="moneyWorked"
        formatter={getMoney}
      />
      <Column
        template={ColumnTypesEnum.NUMBER}
        title="page.team.author.moneyLosses"
        properties="moneyLosses"
        formatter={getMoney}
      />
    </DataView>
  );
}

Employments.defaultProps = {
  response: undefined,
};

export default Employments;
