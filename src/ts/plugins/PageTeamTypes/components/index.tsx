import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import Recommendations from 'ts/components/Recommendations';
import { If, Title, Description, NothingFound, Section } from 'ts/components/Layout';

import View from './View';

const Type = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const rows = statisticStore.statisticsByCommits.type.totalInfo;
  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;

  const recommendations = statisticStore.statisticsByCommits.recommendations.team?.byType;

  return (
    <>
      <If value={mode !== 'fullscreen'}>
        <Recommendations
          mode={mode}
          recommendations={recommendations}
        />
      </If>

      <Title title="plugin.team_types.title"/>
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${statisticStore.hash}`}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination />
      </FakeDataLoader>

      <Section>
        <Description translationId="plugin.team_types.description" />
      </Section>
    </>
  );
});

export default Type;
