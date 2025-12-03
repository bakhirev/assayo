import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { NothingFound } from 'ts/components/Layout';

// TODO: убрать зависимость на другой плагин
import TasksView from 'ts/plugins/PageTeamTasks/components/components/View';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

const Tasks = observer(({
  user,
  mode,
}: PageOptions): React.ReactElement | null => {
  const allRows = dataGripStore.dataGrip.tasks.statistic;
  const rows = allRows.filter((row: any) => (
    row.author === user.author || row?.authors?.[user.author]
  ));
  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <FakeDataLoader
      content={rows}
      mode={mode}
      watch={`${mode}${dataGripStore.hash}${user.author}`}
    >
      <TasksView
        mode={mode}
        rowsForExcel={rows}
      />
      <Pagination />
    </FakeDataLoader>
  );
});

export default Tasks;
