import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import { Section } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';

const PieCharts = observer((): React.ReactElement | null => {
  const vpnDetails = dataGripStore.dataGrip.country.vpn;
  const order = Object.entries(vpnDetails)
    .sort((a: any, b: any) => b[1] - a[1])
    .map((a: any) => a[0]);

  return (
    <Section>
      <PieChart
        title="page.team.country.vpn.title"
        suffix="page.team.country.vpn.item"
        order={order}
        limit={1}
        details={vpnDetails}
      />
    </Section>
  );
});

export default PieCharts;
