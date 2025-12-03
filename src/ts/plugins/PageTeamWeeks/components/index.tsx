import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Title, NothingFound } from 'ts/components/Layout';
import Recommendations from 'ts/components/Recommendations';

import View from './View';

const Week = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.week.statistic;
  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byWeek;

  return (
    <>
      {mode !== 'fullscreen' && (
        <Recommendations
          mode={mode}
          recommendations={recommendations}
        />
      )}
      {mode === 'print' ? (
        <Title title="page.team.week.title"/>
      ) : (
        <>
          <br/>
          <br/>
          <br/>
        </>
      )}
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${dataGripStore.hash}`}
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

export default Week;
