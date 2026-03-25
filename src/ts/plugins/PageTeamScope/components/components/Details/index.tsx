import React from 'react';

import { Gap, Title } from 'ts/components/Layout';

import Icons from './Icons';
import PieCharts from './PieCharts';

interface DetailsProps {
  scope?: any;
}

function Details({ scope }: DetailsProps): React.ReactElement | null {
  if (!scope) return null;

  return (
    <>
      <Gap height="xxl" />

      <Title title="plugin.team_scope.details.cards" />
      <Icons scope={scope} />

      <Title title="plugin.team_scope.details.charts" />
      <PieCharts scope={scope} />
    </>
  );
}

export default Details;
