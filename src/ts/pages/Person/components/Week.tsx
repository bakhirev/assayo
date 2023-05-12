import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import IHashMap from 'ts/interfaces/HashMap';
import { IPaginationRequest, IPagination } from 'ts/interfaces/Pagination';
import { getShortDateRange, getShortNumber } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import PageWrapper from 'ts/components/Page/wrapper';
import DataLoader from 'ts/components/DataLoader';
import LoadMore from 'ts/components/DataLoader/components/LoadMore';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';
import Table from 'ts/components/Table';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import RecommendationsWrapper from 'ts/components/Recommendations/wrapper';

import { getMax } from 'ts/pages/Common/helpers/getMax';

interface IWeekViewProps {
  name: string;
  response?: IPagination<any>;
}

function WeekView({ response, name }: IWeekViewProps) {
  if (!response) return null;

  const typeChart = getOptions({ max: getMax(response, 'authors', name), order: dataGripStore.dataGrip.type.list });
  const workDaysChart = getOptions({ max: 7, order: ['будни', 'выходные'], suffix: 'дней' });
  const taskInDayChart = getOptions({ max: getMax(response, 'taskInDay', name) });

  return (
    <Table rows={response.content}>
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        title="Дата"
        properties="timestamp"
        formatter={getShortDateRange}
        width={200}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="authors"
        formatter={(authors: IHashMap<number>) => authors[name] || 0}
      />
      <Column
        title="Количество задач"
        template={(row: any) => (
          <LineChart
            options={typeChart}
            value={row.authors[name]}
            details={row.typeByAuthor[name]}
          />
        )}
        width={200}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="workDays"
        formatter={(workDays: IHashMap<number>) => workDays[name] || 0}
      />
      <Column
        title="Дни с коммитами"
        template={([work, week]: any) => (
          <LineChart
            options={workDaysChart}
            value={work + week}
            details={{ 'будни': work, 'выходные': week }}
          />
        )}
        formatter={(row: any) => ( // TODO: не верно, тут сумма, а сб или вс не факт. Он мог прогулять пн, но работать в вс
          row?.workDays[name] > 5
            ? [5, row?.workDays[name] - 5]
            : [row?.workDays[name], 0]
        )}
        width={200}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="taskInDay"
        formatter={(taskInDay: IHashMap<number>) => getShortNumber(taskInDay[name] || 0)}
      />
      <Column
        title="Задач в день"
        properties="taskInDay"
        template={(taskInDay: any) => (
          <LineChart
            options={taskInDayChart}
            value={taskInDay[name]}
          />
        )}
        width={200}
      />
    </Table>
  );
}

WeekView.defaultProps = {
  response: undefined,
};

const Week = observer((): React.ReactElement => {
  const { userId } = useParams<any>();
  const statistic = dataGripStore.dataGrip.author.statistic[userId || 0];
  const rows = dataGripStore.dataGrip.week.statistic.filter((item: any) => item.authors[statistic.author]);
  if (!rows?.length) return (<NothingFound />);
  const recommendations = dataGripStore.dataGrip.recommendations.person?.byWeek[statistic.author];

  return (
    <>
      <RecommendationsWrapper recommendations={recommendations} />
      <Title title="Статистика по неделям"/>
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={(pagination?: IPaginationRequest) => getFakeLoader(rows, pagination)}
        >
          <WeekView name={statistic.author} />
          <LoadMore />
        </DataLoader>
      </PageWrapper>
    </>
  );
});

export default Week;
