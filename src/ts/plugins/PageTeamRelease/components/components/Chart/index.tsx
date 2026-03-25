import React from 'react';
import { observer } from 'mobx-react-lite';

import { Column, ColumnTypes, Table } from 'ts/components/Table';
import { GanttChart, useDefaultGanttChartMarker } from 'ts/components/Charts';

import PageWrapper from 'ts/components/Page/wrapper';
import { getGroupsByYear, getPositionInPercent } from './helpers';

interface ChartProps {
  content?: any[];
}

const Chart = observer(({ content }: ChartProps): React.ReactElement | null => {
  if (!content || !content?.length) return null;

  const rows = getGroupsByYear(content);
  const [markersText, markersLines] = useDefaultGanttChartMarker();

  return (
    <PageWrapper template="table">
      <Table rows={rows}>
        <Column
          template={ColumnTypes.STRING}
          width={100}
          properties="year"
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
              mode="circle"
              markersLine={markersLines}
              lines={row.lines}
              formatter={getPositionInPercent(row.year)}
            />
          )}
        />
      </Table>
    </PageWrapper>
  );
});

export default Chart;
