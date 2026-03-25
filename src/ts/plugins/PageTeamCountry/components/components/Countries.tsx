import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import statisticStore from 'ts/store/Statistics';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import { getMaxByLength } from 'ts/helpers/charts';

import Employments from './Employments';

function Countries({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const getAuthorByName = statisticStore.statisticsByCommits.author.totalInfoByName;
  const employmentsMax = getMaxByLength(response, 'employments');

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
      fullScreenMode="countries"
    >
      <Column
        isFixed
        template={ColumnTypes.DETAILS}
        width={40}
        formatter={(row: any) => {
          const content = row.employments
            .map((name: string) => getAuthorByName.get(name))
            .filter((v: any) => v);
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
        properties="country"
        title="plugin.team_country.table.country"
        width={200}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="employments"
        formatter={(employments: string[]) => employments.length}
      />
      <Column
        isSortable
        properties="employments"
        width={200}
        template={(employments: any) => (
          <LineChart
            value={employments.length}
            max={employmentsMax}
          />
        )}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="employments"
        minWidth={300}
        title="plugin.team_country.table.employments"
        formatter={(employments: string[]) => employments.join(', ')}
      />
    </DataView>
  );
}

Countries.defaultProps = {
  response: undefined,
};

export default Countries;
