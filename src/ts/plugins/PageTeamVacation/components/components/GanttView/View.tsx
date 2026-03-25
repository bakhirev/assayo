import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { Table, Column, ColumnTypes } from 'ts/components/Table';
import { GanttChart, useDefaultGanttChartMarker } from 'ts/components/Charts';
import PageWrapper from 'ts/components/Page/wrapper';
import { Gap } from 'ts/components/Layout';

import { getPositionInPercent } from '../../helpers';

interface ViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
}

export function View({ response, updateSort }: ViewProps) {
  if (!response) return null;

  const [markersText, markersLines] = useDefaultGanttChartMarker();

  return (
    <PageWrapper template="table">
      <Gap height="xxl"/>
      <Table
        rows={response.content}
        sort={response.sort}
        updateSort={updateSort}
      >
        <Column
          template={ColumnTypes.STRING}
          width={200}
          properties="author"
        />
        <Column
          title={() => (
            <GanttChart
              markersLine={markersLines}
              markersText={markersText}
              formatter={getPositionInPercent()}
            />
          )}
          template={(row: any) => (
            <GanttChart
              markersLine={markersLines}
              markersText={row.header ? markersText : []}
              lines={row.header ? [] : row.lines}
              formatter={getPositionInPercent(row.year)}
            />
          )}
        />
      </Table>
    </PageWrapper>
  );
}

export default View;
