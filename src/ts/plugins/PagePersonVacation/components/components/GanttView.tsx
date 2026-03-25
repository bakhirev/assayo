import React, { useMemo } from 'react';

import { Table, Column, ColumnTypes } from 'ts/components/Table';
import { GanttChart, useDefaultGanttChartMarker } from 'ts/components/Charts';
import {
  getGroupsAbsencesByYearAuthor,
  getPositionInPercent,
} from 'ts/plugins/PageTeamVacation/components/helpers';

interface ViewProps {
  rows?: any[];
}

export function GanttView({ rows }: ViewProps) {
  const formattedRows = useMemo(() => getGroupsAbsencesByYearAuthor(rows), [rows]);
  const [markersText, markersLines] = useDefaultGanttChartMarker();

  return (
    <Table rows={formattedRows}>
      <Column
        template={ColumnTypes.STRING}
        width={90}
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
            markersLine={markersLines}
            lines={row.lines}
            formatter={getPositionInPercent(row.year)}
          />
        )}
      />
    </Table>
  );
}

export default GanttView;
