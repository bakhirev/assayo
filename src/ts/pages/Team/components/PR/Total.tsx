import React from 'react';

import Table from 'ts/components/Table';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import dataGripStore from 'ts/store/DataGrip';
import DataGripByPR from 'ts/helpers/DataGrip/components/pr';

function Total() {
  const allPR = dataGripStore.dataGrip.pr.statistic;

  const workChart = DataGripByPR.getPRByGroups(allPR, 'workDays');
  const workChartOptions = getOptions({ order: workChart.order, limit: 3, suffix: 'задачь' });

  const delayChart = DataGripByPR.getPRByGroups(allPR, 'delayDays');
  const delayChartOptions = getOptions({ order: delayChart.order, limit: 3, suffix: 'PR' });

  const workDaysWeightedAverage = Math.round(workChart.weightedAverage);
  const delayDaysWeightedAverage = Math.round(delayChart.weightedAverage);
  const weightedAverage =  workDaysWeightedAverage + delayDaysWeightedAverage;

  const weightedAverageChart = getOptions({ // @ts-ignore
    order: ['разработка', 'ожидание'],
    suffix: 'дней',
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
    <Table rows={rows}>
      <Column
        title="Время разработки"
        properties="workDays"
        template={(details: any) => (
          <LineChart
            options={workChartOptions}
            details={details}
          />
        )}
      />
      <Column
        title="Время ожидания влития"
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
        title="Среднее время поставки (дни)"
        properties="weightedAverageDetails"
        width={300}
        template={(item: any) => (
          <LineChart
            options={weightedAverageChart}
            details={{
              'разработка': item.workDays,
              'ожидание': item.delayDays,
            }}
          />
        )}
      />
    </Table>
  );
}

export default Total;
