import React from 'react';

import type { License } from 'ts/helpers/StatisticsByPackageJson/components/licenses';
import ViewProps from 'ts/interfaces/ViewProps';
import { Column, ColumnTypes } from 'ts/components/Table';
import { DataView } from 'ts/components/Layout';
import { LineChart } from 'ts/components/Charts';

import Description from './Description';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import statisticStore from '../../../store/StatisticsByCommitsStore';

export function View({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const totalSum = rowsForExcel?.reduce((acc, item) => acc + item?.total, 0);

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
        formatter={(license: License) => {
          const packages = license.packages.map((title: string, id: number) => ({ title, id: id + 1 }));
          return (
            <FakeDataLoader
              content={packages}
              mode={mode}
              watch={`${mode}${statisticStore.hash}`}
            >
              <Description
                mode={mode}
                rowsForExcel={packages}
              />
              {mode !== 'print' && <Pagination />}
            </FakeDataLoader>
          );
        }}
      />
      <Column
        isSortable
        template={ColumnTypes.STRING}
        title="plugin.team_licenses.results.title"
        properties="title"
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="total"
      />
      <Column
        title="plugin.team_licenses.results.total"
        properties="total"
        template={(value: number) => (
          <LineChart
            max={totalSum}
            value={value}
          />
        )}
      />
    </DataView>
  );
}

View.defaultProps = {
  response: undefined,
};

export default View;
