import React from 'react';

import { Title, Gap, Description, Section, SectionColumn } from 'ts/components/Layout';

import Common from './components/Common';
import Prefixes from './components/Prefixes';
import MailMap from './components/MailMap';
import Salary from './components/Salary';
import Days from './components/Days';

function Settings(): React.ReactElement | null {
  return (
    <>
      <Section>
        <SectionColumn>
          <Title title="plugin.settings.document.title"/>
          <Common />
        </SectionColumn>
        <SectionColumn>
          <Title title="plugin.settings.links.title"/>
          <Prefixes />
        </SectionColumn>
      </Section>

      <Title title="plugin.settings.mailmap.title"/>
      <Section>
        <SectionColumn>
          <Description translationId="plugin.settings.mailmap.description1"/>
        </SectionColumn>
        <SectionColumn>
          <Description translationId="plugin.settings.mailmap.description2"/>
        </SectionColumn>
      </Section>

      <Gap height="m"/>
      <MailMap />
      <Gap height="xxl"/>

      <Section>
        <SectionColumn>
          <Title title="plugin.settings.days.title"/>
          <Days />
        </SectionColumn>
        <SectionColumn>
          <Title title="plugin.settings.salary.title"/>
          <Salary />
        </SectionColumn>
      </Section>
    </>
  );
}

export default Settings;
