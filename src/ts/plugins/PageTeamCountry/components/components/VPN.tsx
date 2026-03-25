import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import { Section } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';

const PieCharts = observer((): React.ReactElement | null => {
  const vpnDetails = statisticStore.statisticsByCommits.country.vpn;
  const order = Object.entries(vpnDetails)
    .sort((a: any, b: any) => b[1] - a[1])
    .map((a: any) => a[0]);

  return (
    <Section>
      <PieChart
        title="plugin.team_country.vpn.title"
        suffix="plugin.team_country.vpn.item"
        order={order}
        limit={1}
        details={vpnDetails}
      />
    </Section>
  );
});

export default PieCharts;
