import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import { FakeDataLoader } from 'ts/components/DataLoader';
import { Title, NothingFound } from 'ts/components/Layout';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import View from './components/View';
import PieCharts from './components/PieCharts';

const Refactor = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const content = statisticStore.statisticsByFiles.refactor.files;

  if (!content?.length) {
    return <NothingFound />;
  }

  return (
    <>
      <Title title="plugin.team_refactor.title"/>
      <FakeDataLoader
        content={content}
        mode={mode}
      >
        <View mode={mode} />
      </FakeDataLoader>
      <Title title="plugin.team_refactor.charts.title"/>
      <PieCharts rows={content}/>
    </>
  );
});

export default Refactor;

