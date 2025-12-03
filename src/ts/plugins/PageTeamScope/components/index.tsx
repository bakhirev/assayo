import React from 'react';
import { observer } from 'mobx-react-lite';

import { IPagination } from 'ts/interfaces/Pagination';
import { getMoney } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Title, NothingFound, DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import Recommendations from 'ts/components/Recommendations';

interface IScopeViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function ScopeView({ response, updateSort, rowsForExcel, mode }: IScopeViewProps) {
  if (!response) return null;

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
        title="page.team.scope.scope"
        properties="scope"
        width={200}
      />
      <Column
        template={ColumnTypes.NUMBER}
        title="page.team.scope.days"
        properties="days"
      />
      <Column
        isSortable={false}
        template={ColumnTypes.NUMBER}
        title="page.team.scope.authorsDays"
        properties="authors"
        formatter={(authors: any) => {
          return Object.keys(authors)
            .map(name => (authors[name].days || 0))
            .reduce((t, v) => (t + v), 0);
        }}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        title="page.team.scope.tasks"
        properties="tasks"
        formatter={(v: any[]) => (v?.length || 0)}
      />
      <Column
        template={ColumnTypes.NUMBER}
        title="page.team.scope.commits"
        properties="commits"
      />
      <Column
        title="page.team.scope.types"
        properties="types" // TODO: нужно по числу изменений, а не коммитов
        minWidth={200}
        template={(details: any) => (
          <LineChart
            details={details}
            order={dataGripStore.dataGrip.type.list}
          />
        )}
      />
      <Column
        title="page.team.scope.authors"
        properties="authors"
        minWidth={200}
        formatter={(authors: any) => {
          return Object.fromEntries(
            Object.keys(authors).map(name => [name, authors[name]?.commits || 0]),
          );
        }}
        template={(details: any) => (
          <LineChart
            details={details}
            order={dataGripStore.dataGrip.author.list}
          />
        )}
      />
      <Column
        template={ColumnTypes.NUMBER}
        title="page.team.scope.cost"
        properties="cost"
        formatter={getMoney}
      />
    </DataView>
  );
}

ScopeView.defaultProps = {
  response: undefined,
};

const Scope = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.scope.statistic;
  if (rows?.length < 2) return mode !== 'print' ? (<NothingFound />) : null;
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byScope;

  return (
    <>
      {mode !== 'fullscreen' && (
        <Recommendations
          mode={mode}
          recommendations={recommendations}
        />
      )}
      <Title title="page.team.scope.title"/>
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <ScopeView
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination />
      </FakeDataLoader>
    </>
  );
});

export default Scope;
