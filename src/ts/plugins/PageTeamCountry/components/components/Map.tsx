import React from 'react';

import TimeZoneMap from 'ts/components/TimeZoneMap';
import { Title, Section } from 'ts/components/Layout';

interface CustomMapProps {
  authors: any[];
}

function CustomMap({ authors }: CustomMapProps) {
  return (
    <Section>
      <Title title="page.team.country.byTimezone"/>
      <TimeZoneMap authors={authors}/>
    </Section>
  );
}

export default CustomMap;
