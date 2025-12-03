import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import Recommendations from 'ts/components/Recommendations';
import { Title, Description, NothingFound, Section, SectionColumn } from 'ts/components/Layout';

import PieCharts from './components/PieCharts';
import View from './components/View';
import Absence from './components/Absence';

const Author = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.author.statistic;
  const absence = dataGripStore.dataGrip.absence.statistic;

  if (!rows?.length) {
    return mode !== 'print' ? (<NothingFound />) : null;
  }
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byAuthor;

  return (
    <>
      {mode !== 'fullscreen' && (
        <Recommendations
          mode={mode}
          recommendations={recommendations}
        />
      )}

      <br/>
      <br/>
      <PieCharts/>

      <Title title="page.team.author.title"/>
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination/>
      </FakeDataLoader>

      <Section>
        <SectionColumn>
          <Description translationId="page.team.author.description1" />
        </SectionColumn>
        <SectionColumn>
          <Description translationId="page.team.author.description2" />
        </SectionColumn>
      </Section>

      <br/>
      <br/>
      <Title title="page.team.author.absence.title"/>
      <FakeDataLoader
        content={absence}
        mode={mode}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <Absence
          mode={mode}
          rowsForExcel={absence}
        />
        <Pagination/>
      </FakeDataLoader>
    </>
  );
});

export default Author;
