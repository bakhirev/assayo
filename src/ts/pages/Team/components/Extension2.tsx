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
import ExternalLink from 'ts/components/ExternalLink';
import userSettings from 'ts/store/UserSettings';

interface IFilesViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function ExtensionView({ response, updateSort, rowsForExcel, mode }: IFilesViewProps) {
  if (!response) return null;

  const current = getMax(response, 'current', 'count');
  const removed = getMax(response, 'removed', 'count');
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
        properties="extension"
        width={200}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.extension.path"
        width={350}
        properties="path"
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
          template={(value: string, row: any) => {
            if (!row.path) return '';
            return (
              <ExternalLink
                link={`${userSettings?.settings?.linksPrefix?.task || '/'}${value}`}
                text={value}
              />
            );
          }}
          title="page.team.pr.task"
          properties="task"
          width={120}
        />
      )}
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="current"
        formatter={(value: any) => value.count}
      />
      <Column
        isSortable
        title="page.team.extension.current.count"
        properties="current"
        width={170}
        minWidth={170}
        template={(value: any) => (
          <LineChart
            options={filesChart}
            value={value.count}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="removed"
        formatter={(value: any) => value.count}
      />
      <Column
        isSortable
        title="page.team.extension.removed.count"
        properties="removed"
        width={170}
        minWidth={170}
        template={(value: any) => (
          <LineChart
            options={filesChart}
            value={value.count}
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
  const rows = dataGripStore.dataGrip.extension.statistic;
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
        watch={mode}
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
