import React from 'react';

import { SmallCardWithIcon, Section, SectionColumn } from 'ts/components/Layout';
import { getDate, getDuration } from 'ts/helpers/formatter';

interface IconsProps {
  scope: any;
}

function Icons({ scope }: IconsProps): React.ReactElement | null {
  return (
    <Section>
      <SectionColumn>
        <SmallCardWithIcon
          value={getDate(scope.firstCommit)}
          icon="./assets/cards/day.svg"
          title="plugin.team_scope.cards.firstCommit"
        />
        <SmallCardWithIcon
          value={getDate(scope.lastCommit)}
          icon="./assets/cards/day.svg"
          title="plugin.team_scope.cards.lastCommit"
        />
      </SectionColumn>
      <SectionColumn>
        <SmallCardWithIcon
          value={scope.totalDaysWorked}
          icon="./assets/cards/work_days2.svg"
          title="plugin.team_scope.cards.totalDaysWorked.title"
        />
        <SmallCardWithIcon
          value={getDuration(scope.totalDays)}
          icon="./assets/cards/month.svg"
          title="plugin.team_scope.cards.totalDays.title"
        />
      </SectionColumn>
    </Section>
  );
}

export default Icons;
