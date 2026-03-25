import React from 'react';

import { PieChart } from 'ts/components/Charts';
import { Description, Gap, Section, SectionColumn } from 'ts/components/Layout';
import { getGroupsBy } from 'ts/helpers/charts';

const [getGroupsByDateRange, ORDER_BY_DATE] = getGroupsBy('years');

interface TotalProps {
  prWithTask: any[]
}

function Total({ prWithTask }: TotalProps): React.ReactElement | null {
  const daysInReview = getGroupsByDateRange(prWithTask, 'daysInReview');
  const daysWorkOnTask = getGroupsByDateRange(prWithTask, 'daysWorkOnTask');

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="plugin.team_pull_requests.total.daysWorkOnTask"
          details={daysWorkOnTask.details}
          order={ORDER_BY_DATE}
          limit={3}
          suffix="common.statistic.days"
        />
        <Description translationId="plugin.team_pull_requests.total.description1" />
        <Description translationId="plugin.team_pull_requests.total.description11" />
        <Gap height="xl"/>
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="plugin.team_pull_requests.total.daysInReview"
          details={daysInReview.details}
          order={ORDER_BY_DATE}
          limit={3}
          suffix="common.statistic.days"
        />
        <Description translationId="plugin.team_pull_requests.total.description2" />
      </SectionColumn>
    </Section>
  );
}

export default Total;
