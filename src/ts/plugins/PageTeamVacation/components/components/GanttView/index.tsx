import React from 'react';

import List from './List';
import OneWithFilter from './OneWithFilter';
import { getGroupsByYear, getGroupsAbsencesByYearAuthor } from '../../helpers';

interface GanttViewProps {
  rows: any[];
  mode?: string;
}

function GanttView({ mode, rows }: GanttViewProps): React.ReactElement | null {
  const groupsAbsencesByYearAuthor = getGroupsAbsencesByYearAuthor(rows);
  const rowsByYear = getGroupsByYear(groupsAbsencesByYearAuthor);

  return groupsAbsencesByYearAuthor.length > 5
    ? (
      <OneWithFilter
        rowsByYear={rowsByYear}
        mode={mode}
      />
    ) : (
      <List rowsByYear={rowsByYear} />
    );
}

export default GanttView;
