import React from 'react';

import { PieChart } from 'ts/components/Charts';
import { Description, Section, SectionColumn } from 'ts/components/Layout';

import dataGripStore from 'ts/store/DataGrip';
import DataGripByPR from 'ts/helpers/DataGrip/components/pr';

function Total() {
  const allPR = dataGripStore.dataGrip.pr.statistic;

  const workChart = DataGripByPR.getPRByGroups(allPR, 'daysInWork');
  const delayChart = DataGripByPR.getPRByGroups(allPR, 'daysReview');
  const backlogChart = DataGripByPR.getPRByGroups(allPR, 'daysBacklog');

  const workDaysWeightedAverage = Math.round(workChart.weightedAverage);
  const delayDaysWeightedAverage = Math.round(delayChart.weightedAverage);

  return (
    <Section>
      <SectionColumn>
        <PieChart
          title="page.team.pr.backlogDays"
          details={backlogChart.details}
          order={backlogChart.order}
          limit={3}
          suffix="PR"
        />
        <PieChart
          title="page.team.pr.delayDays"
          details={delayChart.details}
          order={delayChart.order}
          limit={3}
          suffix="PR"
        />
        <Description translationId="page.team.pr.description3" />
        <Description translationId="page.team.pr.description2" />
        <br/>
        <br/>
      </SectionColumn>
      <SectionColumn>
        <PieChart
          title="page.team.pr.workDays"
          details={workChart.details}
          order={workChart.order}
          limit={3}
          suffix="page.team.pr.tasks"
        />
        <PieChart
          title="page.team.pr.middleTimeRelease"
          details={{
            'page.team.pr.work': workDaysWeightedAverage,
            'page.team.pr.delay': delayDaysWeightedAverage,
          }}
          order={[
            'page.team.pr.word',
            'page.team.pr.delay',
          ]}
          suffix="page.team.pr.days"
        />
        <Description translationId="page.team.pr.description1" />
      </SectionColumn>
    </Section>
  );
}

export default Total;
