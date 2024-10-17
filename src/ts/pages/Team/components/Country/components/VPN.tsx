import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import PageWrapper from 'ts/components/Page/wrapper';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import PieChart from 'ts/components/PieChart';
import { HashMap } from 'ts/interfaces/HashMap';

function getVpnChart(details: HashMap<number>) {
  const order = Object.entries(details)
    .sort((a: any, b: any) => b[1] - a[1])
    .map((a: any) => a[0]);

  return getOptions({
    order,
    limit: 1,
    suffix: 'page.team.country.vpn.item',
  });
}

const PieCharts = observer((): React.ReactElement | null => {
  const vpnDetails = dataGripStore.dataGrip.country.vpn;
  const vpnOptions = getVpnChart(vpnDetails);

  return (
    <PageWrapper>
      <PieChart
        title="page.team.country.vpn.title"
        options={vpnOptions}
        details={vpnDetails}
      />
    </PageWrapper>
  );
});

export default PieCharts;
