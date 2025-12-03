import React from 'react';
import { observer } from 'mobx-react-lite';

import IHashMap from 'ts/interfaces/HashMap';
import { IPagination } from 'ts/interfaces/Pagination';
import { getShortDateRange, getShortNumber } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { NothingFound, DataView } from 'ts/components/Layout';
import { Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import Recommendations from 'ts/components/Recommendations';

import { getMaxSubValues } from 'ts/helpers/getMax';
import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';

interface IWeekViewProps {
  name: string;
  response?: IPagination<any>;
  updateSort?: Function;
  mode?: string;
}

function WeekView({ response, updateSort, name, mode }: IWeekViewProps) {
  if (!response) return null;

  const [typeMax, taskInDayMax] = getMaxSubValues(response, ['authors', 'taskInDay'], name);
  console.log(typeMax);
  console.log(taskInDayMax);

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
        template={ColumnTypes.STRING}
        title="page.person.week.date"
        properties="timestamp"
        formatter={getShortDateRange}
        width={200}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="authors"
        formatter={(authors: IHashMap<number>) => authors[name] || 0}
      />
      <Column
        title="page.person.week.tasks"
        template={(row: any) => (
          <LineChart
            order={dataGripStore.dataGrip.type.list}
            max={typeMax}
            value={row.authors[name]}
            details={row.typeByAuthor[name]}
          />
        )}
        width={200}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="workDays"
        formatter={(workDays: IHashMap<number>) => workDays[name] || 0}
      />
      <Column
        title="page.person.week.workDays"
        template={([work, week]: any) => (
          <LineChart
            value={work + week}
            max={7}
            details={{
              'page.person.week.workDay': work,
              'page.person.week.weekends': week,
            }}
            order={[
              'page.person.week.workDay',
              'page.person.week.weekends',
            ]}
            suffix="page.person.week.days"
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
        template={ColumnTypes.SHORT_NUMBER}
        properties="taskInDay"
        formatter={(taskInDay: IHashMap<number>) => getShortNumber(taskInDay[name] || 0)}
      />
      <Column
        title="page.person.week.taskInDay"
        properties="taskInDay"
        template={(taskInDay: any) => (
          <LineChart
            max={taskInDayMax}
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
      <FakeDataLoader content={rows}>
        <WeekView
          name={statistic.author}
          mode={mode}
        />
        {mode !== 'print' && <Pagination/>}
      </FakeDataLoader>
    </>
  );
});

export default Week;
