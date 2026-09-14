import React from 'react';

import { SmallCardWithIcon, Section, SectionColumn } from 'ts/components/Layout';

import ProgressCard from './ProgressCard';
import ProgressLine from './ProgressLine';

interface SmallCardsProps {
  user?: any;
  positive: string[];
  normal: string[];
  negative: string[];
  publicity: string[];
}

function SmallCards({ user, positive, normal, negative, publicity }: SmallCardsProps): React.ReactElement {
  return (
    <Section>
      <SectionColumn>
        <ProgressCard>
          <ProgressLine
            value={user.totalDays}
            max={55}
            title="plugin.person_achievements.page.progress.dayWorks"
            icon="./assets/rating/days.svg"
          />
          <ProgressLine
            value={user.totalTasks}
            max={66}
            title="plugin.person_achievements.page.progress.tasks"
            icon="./assets/rating/tasks.svg"
          />
          <ProgressLine
            value={user.totalTaskInDay}
            max={66}
            title="plugin.person_achievements.page.progress.taskInDay"
            icon="./assets/rating/speed.svg"
          />
          <ProgressLine
            value={user.commits}
            max={66}
            title="plugin.person_achievements.page.progress.commits"
            icon="./assets/rating/commit.svg"
          />
          <ProgressLine
            value={user.middleMessageLength}
            max={66}
            title="plugin.person_achievements.page.progress.middleMessageLength"
            icon="./assets/rating/text.svg"
          />
        </ProgressCard>
      </SectionColumn>
      <SectionColumn>
        <SmallCardWithIcon
          value={String(positive.length)}
          icon="./assets/cards/commits.svg"
          title="plugin.person_achievements.page.positive"
        />
        <SmallCardWithIcon
          value={String(normal.length)}
          icon="./assets/cards/work_days2.svg"
          title="plugin.person_achievements.page.normal"
        />
        <SmallCardWithIcon
          value={String(negative.length)}
          icon="./assets/cards/location.svg"
          title="plugin.person_achievements.page.negative"
        />
        <SmallCardWithIcon
          value={String(publicity.length)}
          icon="./assets/cards/mail.svg"
          title="plugin.person_achievements.page.publicity"
        />
      </SectionColumn>
    </Section>
  );
}

export default SmallCards;
