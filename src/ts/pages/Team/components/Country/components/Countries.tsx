import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import { getMaxByLength } from 'ts/pages/Common/helpers/getMax';

import Employments from '../../Company/components/Employments';

interface CompaniesProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function Countries({ response, updateSort, rowsForExcel, mode }: CompaniesProps) {
  if (!response) return null;

  const employmentsChart = getOptions({ max: getMaxByLength(response, 'employments') });

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
        template={ColumnTypesEnum.DETAILS}
        width={40}
        formatter={(row: any) => {
          const content = row.employments.map((name: string) => (
            dataGripStore?.dataGrip?.author?.statisticByName?.[name]
          )).filter((v: any) => v);
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
        template={ColumnTypesEnum.STRING}
        properties="country"
        title="page.team.country.table.country"
        width={200}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="employments"
        formatter={(employments: string[]) => employments.length}
      />
      <Column
        isSortable
        properties="employments"
        width={200}
        template={(employments: any) => (
          <LineChart
            options={employmentsChart}
            value={employments.length}
          />
        )}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        properties="employments"
        minWidth={300}
        title="page.team.country.table.employments"
        formatter={(employments: string[]) => employments.join(', ')}
      />
    </DataView>
  );
}

Countries.defaultProps = {
  response: undefined,
};

export default Countries;
