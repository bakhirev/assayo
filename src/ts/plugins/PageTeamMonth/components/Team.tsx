import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import Recommendations from 'ts/components/Recommendations';
import YearChart from 'ts/components/YearChart';
import { getEvents } from 'ts/components/YearChart/helpers/events';
import { Filters } from 'ts/components/YearChart/interfaces/Filters';
import Section from 'ts/components/Page/wrapper';
import { If, Title } from 'ts/components/Layout';

import MonthFilters from './components';

const MonthTeam = observer(({
  mode,
}: PageOptions): React.ReactElement => {
  const statistic = statisticStore.statisticsByCommits.month;
  const statisticByAuthor = statisticStore.statisticsByCommits.author.totalInfo;
  const recommendations = statisticStore.statisticsByCommits.recommendations.team?.byTimestamp;
  const events = getEvents(statisticByAuthor, statisticStore.statisticsByCommits);
  const defaultFilters = { release: false, firstLastDays: true };
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  return (
    <>
      <If value={mode !== 'fullscreen'}>
        <Recommendations
          mode={mode}
          recommendations={recommendations}
        />
      </If>

      <Title title="plugin.team_month.title"/>

      <If value={mode !== 'print'}>
        <Section>
          <MonthFilters
            filters={filters}
            onChange={setFilters}
          />
        </Section>
      </If>

      <Section template="table">
        <YearChart
          max={statistic.maxCommitsInDay}
          events={events}
          months={statistic.totalInfo}
          filters={filters}
        />
      </Section>
    </>
  );
});

export default MonthTeam;
