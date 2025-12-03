import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import { Section, SectionColumn } from 'ts/components/Layout';
import { PieChart } from 'ts/components/Charts';
import { increment } from 'ts/helpers/Math';
import getChartByDays from 'ts/helpers/getChartByDays';

import { STATUS } from '../contstants';

function getStatusChart(rows: any[]) {
  const details = rows.reduce((acc: any, row: any) => {
    if (row.isStaff) increment(acc, STATUS.STAFF);
    else if (row.isDismissed) increment(acc, STATUS.DISMISSED);
    else increment(acc, STATUS.WORK);
    return acc;
  }, {});
  const order = Object
    .values(STATUS)
    .filter((key: string) => details[key]);
  return [order, details];
}

const PieCharts = observer((): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.author.statistic;
  const [statusOrder, statusDetails] = getStatusChart(rows);
  const [daysOrder, daysDetails] = getChartByDays(rows, 'daysAll');

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="page.team.author.statusChart.title"
          suffix="page.team.author.statusChart.item"
          order={statusOrder}
          limit={1}
          details={statusDetails}
        />
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="page.team.author.daysChart.title"
          suffix="page.team.author.daysChart.item"
          order={daysOrder}
          limit={1}
          details={daysDetails}
        />
      </SectionColumn>
    </Section>
  );
});

export default PieCharts;
