import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { Gap, SectionWithBg } from 'ts/components/Layout';
import { NothingFound, Title } from 'ts/components/Layout';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';

import GanttView from './components/GanttView';
import PieCharts from './components/PieCharts';
import View from './components/View';

const Page = observer(({ user, mode }: PageOptions): React.ReactElement | null => {
  const rows = statisticStore.statisticsByCommits.absence.totalInfoByName.get(user.author) || [];

  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <>
      <SectionWithBg>
        <Gap height="xl" />
        <GanttView rows={rows} />
      </SectionWithBg>

      <Title title="plugin.person_vacation.charts.title"/>
      <PieCharts content={rows} />

      <Title title="plugin.person_vacation.details.title"/>
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${user.author}${statisticStore.hash}`}
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
