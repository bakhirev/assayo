import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/StatisticsByCommitsStore';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Title, NothingFound, Gap } from 'ts/components/Layout';

import View from './View';
import statisticsByPackageJson from 'ts/helpers/StatisticsByPackageJson';

const Page = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const rows = statisticsByPackageJson.licenses.totalInfo;
  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <>
      {mode === 'print' ? (
        <Title title="plugin.team_weeks.title"/>
      ) : (
        <Gap height={48}/>
      )}
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${statisticStore.hash}`}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        {mode !== 'print' && <Pagination />}
      </FakeDataLoader>
    </>
  );
});

export default Page;
