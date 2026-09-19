import React from 'react';

import { SmallCardWithIcon, Section, SectionColumn } from 'ts/components/Layout';

interface SmallCardsProps {
  user?: any;
  positive: string[];
  normal: string[];
  publicity: string[];
  commitsWithBeautifulTaskNumbers: number;
}

function SmallCards({ positive, normal, publicity, commitsWithBeautifulTaskNumbers }: SmallCardsProps): React.ReactElement {
  return (
    <Section>
      <SectionColumn>
        <SmallCardWithIcon
          value={String(positive.length)}
          icon="./assets/cards/device.svg"
          title="plugin.person_achievements.page.positive"
        />
        <SmallCardWithIcon
          value={String(normal.length)}
          icon="./assets/cards/device.svg"
          title="plugin.person_achievements.page.normal"
        />
      </SectionColumn>
      <SectionColumn>
        <SmallCardWithIcon
          value={String(publicity.length)}
          icon="./assets/cards/device.svg"
          title="plugin.person_achievements.page.publicity"
        />
        <SmallCardWithIcon
          value={String(commitsWithBeautifulTaskNumbers)}
          icon="./assets/cards/tasks.svg"
          title="plugin.person_achievements.page.commitsWithBeautifulTaskNumbers"
        />
      </SectionColumn>
    </Section>
  );
}

export default SmallCards;
