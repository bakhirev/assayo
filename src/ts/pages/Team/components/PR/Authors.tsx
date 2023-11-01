import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';

import Table from 'ts/components/Table';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import { getMax } from 'ts/pages/Common/helpers/getMax';

const TITLES = {
  DAY: 'день',
  THREE_DAY: 'три дня',
  WEEK: 'неделя',
  TWO_WEEK: 'две недели',
  MONTH: 'месяц',
  MORE: 'более',
};
const order = Object.values(TITLES);

interface IAuthorsProps {
  response?: IPagination<any>;
  updateSort?: Function;
}

function Authors({ response, updateSort }: IAuthorsProps) {
  if (!response) return null;

  const timeChart = getOptions({ order, limit: 3 });
  const weightedAverageChart = getOptions({
    max: getMax(response, 'weightedAverage'),
    order: [
      'page.team.pr.work',
      'page.team.pr.delay',
    ],
    suffix: 'page.team.pr.days',
  });

  return (
    <Table
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
    >
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.author"
        properties="author"
        width={250}
      />
      <Column
        title="page.team.pr.workDays"
        properties="workDays"
        template={(details: any) => (
          <LineChart
            options={timeChart}
            details={details}
          />
        )}
      />
      <Column
        title="page.team.pr.delayDays"
        properties="delayDays"
        template={(details: any) => (
          <LineChart
            options={timeChart}
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
        template={(item: any, row: any) => (
          <LineChart
            options={weightedAverageChart}
            value={row.weightedAverage}
            details={{
              'page.team.pr.work': item.workDays,
              'page.team.pr.delay': item.delayDays,
            }}
          />
        )}
      />
    </Table>
  );
}

Authors.defaultProps = {
  response: undefined,
};

export default Authors;
