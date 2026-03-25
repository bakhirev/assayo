import React from 'react';

import PageWrapper from 'ts/components/Page/wrapper';
import { Column, Table } from 'ts/components/Table';
import { GanttChart, useDefaultGanttChartMarker } from 'ts/components/Charts';
import { getPositionInPercent } from '../../helpers';

interface ListProps {
  rowsByYear: any[];
}

function List({ rowsByYear }: ListProps): React.ReactElement | null {
  const rows = rowsByYear.map((item) => (
    [{ year: item.year, isYear: true }, ...item.rows]
  )).flat();

  const [markersText, markersLines] = useDefaultGanttChartMarker();

  return (
    <PageWrapper template="table">
      <Table rows={rows}>
        <Column
          width={200}
          template={(row: any) => (
            row.isYear ? <b>{row.year}</b> : row.author
          )}
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
              markersLine={row.isYear ? [] : markersLines}
              lines={row.lines || []}
              formatter={getPositionInPercent(row.year)}
            />
          )}
        />
      </Table>
    </PageWrapper>
  );
}

export default List;
