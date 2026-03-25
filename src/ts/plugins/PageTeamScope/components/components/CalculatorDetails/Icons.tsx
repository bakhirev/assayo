import React from 'react';

import { CardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import { getShortMoney } from 'ts/helpers/formatter';

interface IconsProps {
  scope: any;
}

function Icons({ scope }: IconsProps): React.ReactElement | null {
  return (
    <Section>
      <SectionColumn>
        <CardWithIcon
          value={scope.commits}
          icon="./assets/cards/commits.svg"
          title="plugin.team_scope.cards.totalCommits.title"
          description="plugin.team_scope.cards.totalCommits.description"
        />
        <CardWithIcon
          value={scope.totalTasks}
          icon="./assets/cards/tasks.svg"
          title="plugin.team_scope.cards.totalTasks.title"
          description="plugin.team_scope.cards.totalTasks.description"
        />
      </SectionColumn>
      <SectionColumn>
        <CardWithIcon
          value={scope.totalDaysWorkedByAuthor}
          icon="./assets/cards/dismissal.svg"
          title="plugin.team_scope.cards.authorsDays.title"
          description="plugin.team_scope.cards.authorsDays.description"
        />
        <CardWithIcon
          value={getShortMoney(scope.cost)}
          icon="./assets/cards/money_total.svg"
          title="plugin.team_scope.cards.cost.title"
          description="plugin.team_scope.cards.cost.description"
        />
      </SectionColumn>
    </Section>
  );
}

export default Icons;
