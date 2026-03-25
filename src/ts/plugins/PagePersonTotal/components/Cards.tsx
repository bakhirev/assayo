import React from 'react';
import { observer } from 'mobx-react-lite';

import { Section, SectionColumn, CardWithIcon } from 'ts/components/Layout';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import statisticStore from 'ts/store/Statistics';

const Cards = observer(({ user }: PageOptions): React.ReactElement => {
  const statistic = user;
  const scoring = statisticStore.statisticsByCommits.scoring.totalInfoByName[user.author];
  const scoringTotal = statisticStore.statisticsByCommits.scoring.total;

  return (
    <Section>
      <SectionColumn>
        <CardWithIcon
          value={statistic.totalDaysWithCommits}
          icon="./assets/cards/work_days.png"
          title="page.person.total.daysWorked.title"
          description="page.person.total.daysWorked.description"
          scoring={{
            value: scoring.totalDaysWithCommits,
            total: scoringTotal.totalDaysWithCommits,
          }}
        />
        <CardWithIcon
          value={statistic.totalDaysWithoutCommits}
          icon="./assets/cards/lazy.svg"
          title="plugin.person_total.daysLosses.title"
          description="plugin.person_total.daysLosses.description"
          scoring={{
            value: scoring.totalDaysWithoutCommits,
            total: scoringTotal.totalDaysWithoutCommits,
          }}
        />
      </SectionColumn>
      <SectionColumn>
        <CardWithIcon
          value={statistic.commits}
          icon="./assets/cards/commits.svg"
          title="plugin.person_total.commits.title"
          description="plugin.person_total.commits.description"
          scoring={{
            value: scoring.commits,
            total: scoringTotal.commits,
          }}
        />
        <CardWithIcon
          value={statistic.totalTasks}
          icon="./assets/cards/tasks.svg"
          title="page.person.total.tasks.title"
          description="page.person.total.tasks.description"
          scoring={{
            value: scoring.totalTasks,
            total: scoringTotal.totalTasks,
          }}
        />
      </SectionColumn>
    </Section>
  );
});

export default Cards;
