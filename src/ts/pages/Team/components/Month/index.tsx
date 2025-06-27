import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import Recommendations from 'ts/components/Recommendations';
import YearChart from 'ts/components/YearChart';
import { getEvents } from 'ts/components/YearChart/helpers/events';
import { Filters } from 'ts/components/YearChart/interfaces/Filters';
import PageWrapper from 'ts/components/Page/wrapper';
import Title from 'ts/components/Title';

import MonthFilters from './Filters';

const Month = observer(({
  mode,
}: ICommonPageProps): React.ReactElement => {
  const statistic = dataGripStore.dataGrip.month;
  const statisticByAuthor = dataGripStore.dataGrip.author.statistic;
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byTimestamp;
  const events = getEvents(statisticByAuthor, dataGripStore.dataGrip);
  const defaultFilters = { release: false, firstLastDays: true };
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  return (
    <>
      {mode !== 'fullscreen' && (
        <Recommendations
          mode={mode}
          recommendations={recommendations}
        />
      )}
      <Title title="page.team.month.title"/>
      <PageWrapper>
        <MonthFilters
          filters={filters}
          onChange={setFilters}
        />
      </PageWrapper>
      <PageWrapper template="table">
        <YearChart
          max={statistic.maxCommitsInDay}
          events={events}
          months={statistic.statistic}
          filters={filters}
        />
      </PageWrapper>
    </>
  );
});

export default Month;
