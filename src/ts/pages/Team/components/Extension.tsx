import React from 'react';
import { observer } from 'mobx-react-lite';

import { IPaginationRequest, IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';
import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import LineChart from 'ts/components/LineChart';
import { getMax } from 'ts/pages/Common/helpers/getMax';
import { TaskLink } from 'ts/components/ExternalLink';

interface IFilesViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function ExtensionView({ response, updateSort, rowsForExcel, mode }: IFilesViewProps) {
  if (!response) return null;

  const current = getMax(response, 'count');
  const removed = getMax(response, 'removedCount');
  const max = Math.max(current, removed);
  const filesChart = getOptions({ max, suffix: 'page.team.extension.files' });

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
        template={ColumnTypesEnum.STRING}
        title="page.team.extension.name"
        properties="type"
        width={200}
      />
      <Column
        template={ColumnTypesEnum.STRING}
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
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="count"
      />
      <Column
        isSortable
        title="page.team.extension.current.count"
        properties="count"
        width={170}
        minWidth={170}
        template={(value: number) => (
          <LineChart
            options={filesChart}
            value={value}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="removedCount"
      />
      <Column
        isSortable
        title="page.team.extension.removed.count"
        properties="removedCount"
        width={170}
        minWidth={170}
        template={(value: number) => (
          <LineChart
            options={filesChart}
            value={value}
          />
        )}
      />
    </DataView>
  );
}

ExtensionView.defaultProps = {
  response: undefined,
};

const Extension = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.fileGrip.type.statistic;
  if (rows?.length < 2) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <>
      {mode === 'print' ? (
        <Title title="sidebar.team.extension"/>
      ) : (
        <>
          <br/>
          <br/>
          <br/>
        </>
      )}
      <DataLoader
        to="response"
        loader={(pagination?: IPaginationRequest) => getFakeLoader({
          content: rows, pagination, mode,
        })}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <ExtensionView
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination />
      </DataLoader>
    </>
  );
});

export default Extension;
