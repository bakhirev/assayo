import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import Recommendations from 'ts/components/Recommendations';
import { Title, Description, NothingFound, Section } from 'ts/components/Layout';

import View from './View';

const Type = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.type.statistic;
  if (!rows?.length) {
    return mode !== 'print' ? (<NothingFound />) : null;
  }
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byType;

  return (
    <>
      {mode !== 'fullscreen' && (
        <Recommendations
          mode={mode}
          recommendations={recommendations}
        />
      )}
      <Title title="page.team.type.title"/>
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination />
      </FakeDataLoader>
      <Section>
        <Description translationId="page.team.type.description" />
      </Section>
    </>
  );
});

export default Type;
