import React from 'react';

import TimeZoneMap from 'ts/components/TimeZoneMap';
import { Title, Section } from 'ts/components/Layout';

interface CustomMapProps {
  authors: any[];
}

function CustomMap({ authors }: CustomMapProps) {
  return (
    <>
      <Title title="plugin.team_country.byTimezone"/>
      <TimeZoneMap authors={authors}/>
    </>
  );
}

export default CustomMap;
