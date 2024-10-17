import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import LineChart from 'ts/components/LineChart';

import { getMaxByLength } from 'ts/pages/Common/helpers/getMax';
import Fly from './Fly';

interface TravelProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Travel({ response, updateSort, rowsForExcel, mode }: TravelProps) {
  if (!response) return null;

  const flyChart = getOptions({ max: getMaxByLength(response, 'country'), suffix: 'page.team.country.travel.flyItem' });

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
        template={ColumnTypesEnum.DETAILS}
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
        template={ColumnTypesEnum.STRING}
        properties="author"
        title="page.team.country.travel.author"
        width={200}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
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
            options={flyChart}
            value={value}
          />
        )}
        formatter={(tasks: any) => (tasks?.length || 0)}
      />
      <Column
        template={ColumnTypesEnum.STRING}
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
