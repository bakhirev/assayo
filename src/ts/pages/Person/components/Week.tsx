import React from 'react';
import { observer } from 'mobx-react-lite';

import IHashMap from 'ts/interfaces/HashMap';
import { IPaginationRequest, IPagination } from 'ts/interfaces/Pagination';
import { getShortDateRange, getShortNumber } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import DataView from 'ts/components/DataView';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import Recommendations from 'ts/components/Recommendations';

import { getMax } from 'ts/pages/Common/helpers/getMax';
import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import ISort from 'ts/interfaces/Sort';

interface IWeekViewProps {
  name: string;
  response?: IPagination<any>;
  updateSort?: Function;
  mode?: string;
}

function WeekView({ response, updateSort, name, mode }: IWeekViewProps) {
  if (!response) return null;

  const typeChart = getOptions({ max: getMax(response, 'authors', name), order: dataGripStore.dataGrip.type.list });
  const workDaysChart = getOptions({ max: 7, order: [
    'page.person.week.workDay',
    'page.person.week.weekends',
  ], suffix: 'page.person.week.days' });
  const taskInDayChart = getOptions({ max: getMax(response, 'taskInDay', name) });

  return (
    <DataView
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        title="page.person.week.date"
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
        title="page.person.week.tasks"
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
        title="page.person.week.workDays"
        template={([work, week]: any) => (
          <LineChart
            options={workDaysChart}
            value={work + week}
            details={{
              'page.person.week.workDay': work,
              'page.person.week.weekends': week,
            }}
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
        title="page.person.week.taskInDay"
        properties="taskInDay"
        template={(taskInDay: any) => (
          <LineChart
            options={taskInDayChart}
            value={taskInDay[name]}
          />
        )}
        width={200}
      />
    </DataView>
  );
}

WeekView.defaultProps = {
  response: undefined,
};

interface IWeekProps extends ICommonPageProps {
  user: any;
}
const Week = observer(({
  user,
  mode,
}: IWeekProps): React.ReactElement => {
  const statistic = user;
  const rows = dataGripStore.dataGrip.week.statistic.filter((item: any) => item.authors[statistic.author]);
  if (!rows?.length) return (<NothingFound />);
  const recommendations = dataGripStore.dataGrip.recommendations.person?.byWeek[statistic.author];

  return (
    <>
      <Recommendations
        mode={mode}
        recommendations={recommendations}
      />
      <DataLoader
        to="response"
        loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
          content: rows, pagination, sort,
        })}
      >
        <WeekView
          name={statistic.author}
          mode={mode}
        />
        {mode !== 'print' && <Pagination/>}
      </DataLoader>
    </>
  );
});

export default Week;
