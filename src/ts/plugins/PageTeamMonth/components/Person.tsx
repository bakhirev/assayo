import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import YearChart from 'ts/components/YearChart';
import { getEvents } from 'ts/components/YearChart/helpers/events';
import Section from 'ts/components/Page/wrapper';
import { Title } from 'ts/components/Layout';

const MonthPerson = observer(({
  user,
}: PageOptions): React.ReactElement => {
  const statistic = statisticStore.statisticsByCommits.month;
  const statisticByAuthor = statisticStore.statisticsByCommits.author.totalInfo;
  const events = getEvents(statisticByAuthor, statisticStore.statisticsByCommits);
  const defaultFilters = { release: false, firstLastDays: true, absence: true };

  return (
    <>
      <Title title="plugin.team_month.title"/>

      <Section template="table">
        <YearChart
          max={statistic.maxCommitsInDay}
          author={user?.author}
          events={events}
          months={statistic.totalInfo}
          filters={defaultFilters}
        />
      </Section>
    </>
  );
});

export default MonthPerson;
