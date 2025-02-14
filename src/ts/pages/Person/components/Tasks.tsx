import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import { getFakeLoader } from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';

import TasksView from 'ts/pages/Team/components/Tasks/View';

import IPersonCommonProps from '../interfaces/CommonProps';

const Tasks = observer(({
  user,
  mode,
}: IPersonCommonProps): React.ReactElement | null => {
  const allRows = dataGripStore.dataGrip.tasks.statistic;
  const rows = allRows.filter((row: any) => (
    row.author === user.author || row?.authors?.[user.author]
  ));
  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <DataLoader
      to="response"
      loader={getFakeLoader(rows, mode)}
      watch={`${mode}${dataGripStore.hash}${user.author}`}
    >
      <TasksView
        mode={mode}
        rowsForExcel={rows}
      />
      <Pagination />
    </DataLoader>
  );
});

export default Tasks;
