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
import { getDate } from 'ts/helpers/formatter';

interface IReleaseViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function ReleaseView({ response, updateSort, rowsForExcel, mode }: IReleaseViewProps) {
  if (!response) return null;

  const delay = getMax(response, 'delayInDays');
  const waiting = getMax(response, 'waitingInDays');
  const max = Math.max(delay, waiting);
  const delayChart = getOptions({ max, suffix: 'page.team.release.chart' });

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
        title="page.team.release.title"
        properties="title"
        width={200}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.release.from"
        width={150}
        properties="from"
        formatter={getDate}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        title="page.team.release.to"
        width={150}
        properties="to"
        formatter={getDate}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="delayInDays"
      />
      <Column
        isSortable
        title="page.team.release.delay"
        properties="delayInDays"
        width={170}
        minWidth={170}
        template={(value: number) => (
          <LineChart
            options={delayChart}
            value={value}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="waitingInDays"
      />
      <Column
        isSortable
        title="page.team.release.waiting"
        properties="waitingInDays"
        width={170}
        minWidth={170}
        template={(value: number) => (
          <LineChart
            options={delayChart}
            value={value}
          />
        )}
      />
    </DataView>
  );
}

ReleaseView.defaultProps = {
  response: undefined,
};

const Release = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.release.statistic;
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
        <ReleaseView
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination />
      </DataLoader>
    </>
  );
});

export default Release;
