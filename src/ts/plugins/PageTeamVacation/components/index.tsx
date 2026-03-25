import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { NothingFound, Title } from 'ts/components/Layout';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';

import GanttView from './components/GanttView';
import View from './components/View';
import PieCharts from './components/PieCharts';

const Page = observer(({ mode }: PageOptions): React.ReactElement | null => {
  const rows = statisticStore.statisticsByCommits.absence.totalInfo || [];

  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;
  // распределение отпусков
  // Общее количество
  // Лидер

  return (
    <>
      <Title title="plugin.team_vacation.charts.title"/>
      <PieCharts content={rows} />

      <Title title="plugin.team_vacation.grant.title"/>
      <GanttView
        rows={rows}
        mode={mode}
      />

      <Title title="plugin.team_vacation.details.title"/>
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${statisticStore.hash}`}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination/>
      </FakeDataLoader>
    </>
  );
});

export default Page;
