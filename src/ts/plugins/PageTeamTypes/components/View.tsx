import React from 'react';
import { useTranslation } from 'react-i18next';

import IHashMap from 'ts/interfaces/HashMap';
import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { DataView } from 'ts/components/Layout';

import { getMaxValues } from 'ts/helpers/getMax';

interface ViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  const { t } = useTranslation();
  const unknown = t('page.team.type.unknown');

  if (!response) return null;

  const [tasksMax, daysMax] = getMaxValues(response, [
    'tasks', 'daysByAuthorsTotal',
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
        title="page.team.type.type"
        properties="type"
        formatter={(type: string) => type || unknown}
        width={150}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="tasks"
      />
      <Column
        isSortable
        title="page.team.type.tasks"
        properties="tasks"
        minWidth={120}
        template={(value: number) => (
          <LineChart
            value={value}
            max={tasksMax}
            suffix="page.team.type.tasksSmall"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        title="page.team.type.days"
        properties="days"
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="daysByAuthorsTotal"
      />
      <Column
        isSortable
        title="page.team.type.authorsDays"
        properties="daysByAuthorsTotal"
        minWidth={120}
        template={(value: number) => (
          <LineChart
            value={value}
            max={daysMax}
            suffix="page.team.type.daysSmall"
          />
        )}
      />
      <Column
        template={ColumnTypes.NUMBER}
        title="page.team.type.commits"
        properties="commits"
      />
      <Column
        title="page.team.type.authors"
        properties="commitsByAuthors"
        template={(details: IHashMap<number>) => (
          <LineChart
            details={details}
            order={dataGripStore.dataGrip.author.list}
          />
        )}
        minWidth={500}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
