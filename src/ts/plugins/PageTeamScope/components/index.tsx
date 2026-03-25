import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { If, Title } from 'ts/components/Layout';
import Recommendations from 'ts/components/Recommendations';

import View from './components/View';
import Calculator from './components/Calculator';

const Scope = observer(({ mode }: PageOptions): React.ReactElement | null => {
  const rows = statisticStore.statisticsByCommits.scope.totalInfo;
  if (rows?.length < 2 && mode === 'print') return null;

  const recommendations = statisticStore.statisticsByCommits.recommendations.team?.byScope;

  return (
    <>
      <If value={rows?.length > 1}>
        {mode !== 'fullscreen' && (
          <Recommendations
            mode={mode}
            recommendations={recommendations}
          />
        )}

        <Title title="plugin.team_scope.title"/>
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
      </If>

      <Calculator mode={mode} />
    </>
  );
});

export default Scope;
