import React from 'react';

import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import dataGripStore from 'ts/store/DataGrip';
import DataGripByPR from 'ts/helpers/DataGrip/components/pr';

function Total() {
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

  const rows = [
    {
      workDays: workChart.details,
      delayDays: delayChart.details,
      weightedAverage: weightedAverage.toFixed(1),
      weightedAverageDetails: {
        workDays: workDaysWeightedAverage,
        delayDays: delayDaysWeightedAverage,
      },
    },
  ];

  return (
    <DataView rows={rows}>
      <Column
        title="page.team.pr.workDays"
        properties="workDays"
        template={(details: any) => (
          <LineChart
            options={workChartOptions}
            details={details}
          />
        )}
      />
      <Column
        title="page.team.pr.delayDays"
        properties="delayDays"
        template={(details: any) => (
          <LineChart
            options={delayChartOptions}
            details={details}
          />
        )}
      />
      <Column
        properties="weightedAverage"
        template={ColumnTypesEnum.SHORT_NUMBER}
      />
      <Column
        title="page.team.pr.middleTimeRelease"
        properties="weightedAverageDetails"
        width={300}
        template={(item: any) => (
          <LineChart
            options={weightedAverageChart}
            details={{
              'page.team.pr.work': item.workDays,
              'page.team.pr.delay': item.delayDays,
            }}
          />
        )}
      />
    </DataView>
  );
}

export default Total;
