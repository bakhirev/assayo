import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import { getMaxByLength } from 'ts/helpers/charts';
import Fly from './Fly';

function Travel({ response, updateSort, rowsForExcel, mode }: ViewProps) {
  if (!response) return null;

  const flyMax = getMaxByLength(response, 'countries');

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
      fullScreenMode="travel"
    >
      <Column
        isFixed
        template={ColumnTypes.DETAILS}
        width={40}
        formatter={(row: any) => (
          <Fly // @ts-ignore
            response={{ content: row.countries }}
            mode="details"
          />
        )}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        properties="author"
        title="plugin.team_country.travel.author"
        width={200}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="countries"
        formatter={(countries: any) => countries.length - 1}
      />
      <Column
        isSortable
        properties="countries"
        title="plugin.team_country.travel.fly"
        width={200}
        template={(value: number) => (
          <LineChart
            value={value}
            max={flyMax}
            suffix="plugin.team_country.travel.flyItem"
          />
        )}
        formatter={(countries: any) => (countries?.length || 0)}
      />
      <Column
        template={ColumnTypes.STRING}
        title="plugin.team_country.travel.path"
        formatter={(row: any) => row.countries.map((c: any) => c.title).join(' ✈️ ')}
      />
    </DataView>
  );
}

Travel.defaultProps = {
  response: undefined,
};

export default Travel;
