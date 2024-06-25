import React from 'react';
import { useTranslation } from 'react-i18next';

import PieChart from 'ts/components/PieChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import Description from 'ts/components/Description';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';

import dataGripStore from 'ts/store/DataGrip';
import DataGripByPR from 'ts/helpers/DataGrip/components/pr';

function Total() {
  const { t } = useTranslation();

  const allPR = dataGripStore.dataGrip.pr.statistic;

  const workChart = DataGripByPR.getPRByGroups(allPR, 'workDays');
  const workChartOptions = getOptions({ order: workChart.order, limit: 3, suffix: 'page.team.pr.tasks' });

  const delayChart = DataGripByPR.getPRByGroups(allPR, 'delayDays');
  const delayChartOptions = getOptions({ order: delayChart.order, limit: 3, suffix: 'PR' });

  const workDaysWeightedAverage = Math.round(workChart.weightedAverage);
  const delayDaysWeightedAverage = Math.round(delayChart.weightedAverage);
  const weightedAverage =  workDaysWeightedAverage + delayDaysWeightedAverage;

  const weightedAverageChart = getOptions({ // @ts-ignore
    order: ['page.team.pr.word', 'page.team.pr.delay'],
    suffix: 'page.team.pr.days',
  });

  console.log(weightedAverage.toFixed(1));

  return (
    <PageWrapper>
      <PageColumn>
        <PieChart
          title="page.team.pr.workDays"
          options={workChartOptions}
          details={workChart.details}
        />
        <PieChart
          title="page.team.pr.middleTimeRelease"
          options={weightedAverageChart}
          details={{
            'page.team.pr.work': workDaysWeightedAverage,
            'page.team.pr.delay': delayDaysWeightedAverage,
          }}
        />
      </PageColumn>
      <PageColumn>
        <PieChart
          title="page.team.pr.delayDays"
          options={delayChartOptions}
          details={delayChart.details}
        />
        <Description text={t('page.team.pr.description1')} />
        <Description text={t('page.team.pr.description2')} />
        <Description text={t('page.team.pr.description3')} />
      </PageColumn>
    </PageWrapper>
  );
}

export default Total;
