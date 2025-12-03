import React from 'react';
import { useTranslation } from 'react-i18next';

import { IPagination } from 'ts/interfaces/Pagination';
import { getDate } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import UiKitTags from 'ts/components/UiKit/components/Tags';
import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import { getMaxValues } from 'ts/helpers/getMax';
import { increment } from 'ts/helpers/Math';

import Employments from './Employments';

interface DepartmentsProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Departments({ response, updateSort, rowsForExcel, mode }: DepartmentsProps) {
  const { t } = useTranslation();
  if (!response) return null;

  const [active, notActive] = [
    t('page.team.company.active.yes'),
    t('page.team.company.active.no'),
  ];

  const [works, dismissed, staff] = [
    t('page.team.author.type.work'),
    t('page.team.author.type.dismissed'),
    t('page.team.author.type.staff'),
  ];

  const [daysMax, authorsMax] = getMaxValues(response, ['totalDays', 'totalAuthors']);

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
        template={ColumnTypes.DETAILS}
        width={40}
        formatter={(row: any) => {
          const content = dataGripStore.dataGrip.author.statistic
            .filter((item: any) => row?.authors?.includes(item.author));
          return (
            <Employments // @ts-ignore
              response={{ content }}
              mode="details"
            />
          );
        }}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        properties="taskCode"
        title="page.team.department.code"
      />
      <Column
        title="page.team.author.status"
        formatter={(row: any) => (row.isActive ? active : notActive)}
        template={(value: string) => <UiKitTags value={value} />}
        width={140}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="from"
        title="page.team.department.from"
        width={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="to"
        title="page.team.department.to"
        width={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalDaysWorked"
        width={90}
      />
      <Column
        isSortable="totalDays"
        title="page.team.department.totalDays"
        properties="totalDaysWorked"
        minWidth={150}
        template={(value: number) => (
          <LineChart
            value={value}
            max={daysMax}
            suffix="page.team.author.days"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="totalAuthors"
        width={90}
      />
      <Column
        isSortable="totalAuthors"
        title="page.team.department.totalAuthors"
        minWidth={150}
        template={(row: any) => {
          const statisticByName = dataGripStore.dataGrip.author.statisticByName;
          const details = row.authors.reduce((acc: any, name: string) => {
            const author = statisticByName[name] || {};
            if (author.isStaff) increment(acc, staff);
            else if (author.isDismissed) increment(acc, dismissed);
            else increment(acc, works);
            return acc;
          }, {});

          return (
            <LineChart
              value={row.totalAuthors}
              max={authorsMax}
              details={details}
              order={[works, dismissed, staff]}
              suffix="page.team.department.authors"
            />
          );
        }}
      />
    </DataView>
  );
  // задач в день (неделю)
  // активных сотрудников
  // состав команд по активным сотрудникам
}

Departments.defaultProps = {
  response: undefined,
};

export default Departments;
