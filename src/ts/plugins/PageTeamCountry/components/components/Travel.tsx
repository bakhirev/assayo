import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import { DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import { getMaxByLength } from 'ts/helpers/getMax';
import Fly from './Fly';

interface TravelProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Travel({ response, updateSort, rowsForExcel, mode }: TravelProps) {
  if (!response) return null;

  const flyMax = getMaxByLength(response, 'country');

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
        formatter={(row: any) => {
          const content = row?.country;
          return (
            <Fly // @ts-ignore
              response={{ content }}
              mode="details"
            />
          );
        }}
      />
      <Column
        isFixed
        template={ColumnTypes.STRING}
        properties="author"
        title="page.team.country.travel.author"
        width={200}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="country"
        formatter={(country: any) => country.length - 1}
      />
      <Column
        isSortable
        properties="country"
        title="page.team.country.travel.fly"
        width={200}
        template={(value: number) => (
          <LineChart
            value={value}
            max={flyMax}
            suffix="page.team.country.travel.flyItem"
          />
        )}
        formatter={(tasks: any) => (tasks?.length || 0)}
      />
      <Column
        template={ColumnTypes.STRING}
        title="page.team.country.travel.path"
        formatter={(row: any) => row.country.map((c: any) => c.country).join(' ✈️ ')}
      />
    </DataView>
  );
}

Travel.defaultProps = {
  response: undefined,
};

export default Travel;
