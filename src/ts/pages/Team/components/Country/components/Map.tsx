import React from 'react';

import TimeZoneMap from 'ts/components/TimeZoneMap';
import PageWrapper from 'ts/components/Page/Box';
import Title from 'ts/components/Title';

interface CustomMapProps {
  authors: any[];
}

function CustomMap({ authors }: CustomMapProps) {
  return (
    <PageWrapper>
      <Title title="page.team.country.byTimezone"/>
      <TimeZoneMap authors={authors}/>
    </PageWrapper>
  );
}

export default CustomMap;
