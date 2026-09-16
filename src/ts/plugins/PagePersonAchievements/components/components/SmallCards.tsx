import React from 'react';

import { SmallCardWithIcon, Section, SectionColumn } from 'ts/components/Layout';

interface SmallCardsProps {
  user?: any;
  positive: string[];
  normal: string[];
  negative: string[];
  publicity: string[];
}

function SmallCards({ positive, normal, negative, publicity }: SmallCardsProps): React.ReactElement {
  return (
    <Section>
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
      </SectionColumn>
      <SectionColumn>
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
