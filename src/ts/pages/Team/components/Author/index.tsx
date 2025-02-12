import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import { getFakeLoader } from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';
import Recommendations from 'ts/components/Recommendations';

import Description from 'ts/components/Description';
import PieCharts from './components/PieCharts';
import View from './components/View';

const Author = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const { t } = useTranslation();
  const rows = dataGripStore.dataGrip.author.statistic;

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

      <br />
      <br />
      <PieCharts />

      <Title title="page.team.author.title"/>
      <DataLoader
        to="response"
        loader={getFakeLoader(rows, mode)}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination />
      </DataLoader>

      <PageWrapper>
        <PageColumn>
          <Description
            text={t('page.team.author.description1')}
          />
        </PageColumn>
        <PageColumn>
          <Description
            text={t('page.team.author.description2')}
          />
        </PageColumn>
      </PageWrapper>
    </>
  );
});

export default Author;
