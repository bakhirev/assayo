import React from 'react';
import { observer } from 'mobx-react-lite';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { getMaxValues } from 'ts/helpers/getMax';
import { Title, NothingFound, DataView, TaskLink } from 'ts/components/Layout';

interface IFilesViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function TypeView({ response, updateSort, rowsForExcel, mode }: IFilesViewProps) {
  if (!response) return null;

  const [current, removed] = getMaxValues(response, ['count', 'removedCount']);
  const max = Math.max(current, removed);

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
        title="page.team.extension.name"
        properties="type"
        width={200}
      />
      <Column
        template={ColumnTypes.STRING}
        title="page.team.extension.path"
        width={350}
        formatter={(row: any) => row.count === 1 || row.removedCount === 1 ? row.path : ''}
      />
      {mode === 'print' ? (
        <Column
          isSortable
          title="page.team.pr.task"
          properties="task"
          width={120}
        />
      ) : (
        <Column
          isSortable
          template={(value: string, row: any) => row.path ? (<TaskLink task={value} />) : ''}
          title="page.team.pr.task"
          properties="task"
          width={120}
        />
      )}
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="count"
      />
      <Column
        isSortable
        title="page.team.extension.current.count"
        properties="count"
        minWidth={170}
        template={(value: number) => (
          <LineChart
            value={value}
            max={max}
            suffix="page.team.extension.files"
          />
        )}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="removedCount"
      />
      <Column
        isSortable
        title="page.team.extension.removed.count"
        properties="removedCount"
        minWidth={170}
        template={(value: number) => (
          <LineChart
            value={value}
            max={max}
            suffix="page.team.extension.files"
          />
        )}
      />
    </DataView>
  );
}

TypeView.defaultProps = {
  response: undefined,
};

const Type = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.fileGrip.type.statistic;
  if (rows?.length < 2) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <>
      <Title title="page.team.extension.type"/>
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <TypeView
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination />
      </FakeDataLoader>
    </>
  );
});

export default Type;
