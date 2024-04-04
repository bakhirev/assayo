import React from 'react';
import { observer } from 'mobx-react-lite';

import ISort from 'ts/interfaces/Sort';
import IHashMap from 'ts/interfaces/HashMap';
import { IPaginationRequest, IPagination } from 'ts/interfaces/Pagination';
import { getShortDateRange } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import Title from 'ts/components/Title';
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

interface IWeekViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
  rowsForExcel?: any[];
  mode?: string;
}

function WeekView({ response, updateSort, rowsForExcel, mode }: IWeekViewProps) {
  if (!response) return null;

  const tasksChart = getOptions({ max: getMax(response, 'tasks'), order: dataGripStore.dataGrip.type.list, suffix: 'page.team.week.tasks' });
  const authorsChart = getOptions({ max: getMax(response, 'authorsLength'), order: dataGripStore.dataGrip.author.list, suffix: 'page.team.week.tasks' });
  const changesChart = getOptions({ max: getMax(response, 'changesLength'), order: [
    'page.team.week.add',
    'page.team.week.change',
    'page.team.week.remove',
  ], suffix: 'строк' });
  const workDaysTotalChart = getOptions({ order: [
    'page.team.week.hasCommits',
    'page.team.week.hasNotCommits',
  ], suffix: 'page.team.week.days' });
  const workDaysChart = getOptions({ order: dataGripStore.dataGrip.author.list, suffix: 'page.team.week.days' });

  return (
    <DataView
      rowsForExcel={rowsForExcel}
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
      type={mode === 'print' ? 'cards' : undefined}
      columnCount={mode === 'print' ? 3 : undefined}
    >
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        title="page.team.week.date"
        properties="timestamp"
        formatter={getShortDateRange}
        width={260}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="tasks"
      />
      <Column
        isSortable="tasks"
        title="page.team.week.numberTasks"
        template={(row: any) => (
          <LineChart
            options={tasksChart}
            value={row.tasks}
            details={row.types}
          />
        )}
        minWidth={200}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="authorsLength"
      />
      <Column
        isSortable="authorsLength"
        title="page.team.week.people"
        template={(row: any) => (
          <LineChart
            options={authorsChart}
            value={row.authorsLength}
            details={row.authors}
          />
        )}
        minWidth={200}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="changesLength"
      />
      <Column
        isSortable="changesLength"
        title="page.team.week.line"
        template={(row: any) => (
          <LineChart
            options={changesChart}
            value={row.changesLength}
            details={{
              'page.team.week.add': row?.changes?.added,
              'page.team.week.change': row?.changes?.changes,
              'page.team.week.remove': row?.changes?.removed,
            }}
          />
        )}
        minWidth={200}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="workDaysTotal"
      />
      <Column
        isSortable="workDaysTotal"
        title="page.team.week.days"
        template={(row: any) => (
          <LineChart
            options={workDaysTotalChart}
            details={{ // TODO: ошибка суммы, т.к. 5 дневка не у всех. Нужно по автору перебирать.
              'page.team.week.hasCommits': row?.workDaysTotal,
              'page.team.week.hasNotCommits': row?.authorsLength * 5 - row?.workDaysTotal,
            }}
          />
        )}
        minWidth={200}
      />
      <Column
        title="page.team.week.lossesDetails"
        template={(details: IHashMap<number>) => (
          <LineChart
            options={workDaysChart}
            details={details}
          />
        )}
        formatter={(row: any) => {
          const detailsLikeArray = Object.entries(row?.workDays).map(([name, days]: any) => [name, 5 - days]);
          return Object.fromEntries(detailsLikeArray.filter((nameDays: any) => nameDays[1] > 0));
        }}
        minWidth={200}
      />
    </DataView>
  );
}

WeekView.defaultProps = {
  response: undefined,
};

const Week = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const rows = dataGripStore.dataGrip.week.statistic;
  if (!rows?.length) return mode !== 'print' ? (<NothingFound />) : null;
  const recommendations = dataGripStore.dataGrip.recommendations.team?.byWeek;

  return (
    <>
      <Recommendations
        mode={mode}
        recommendations={recommendations}
      />
      {mode === 'print' ? (
        <Title title="page.team.week.title"/>
      ) : (
        <>
          <br/>
          <br/>
          <br/>
        </>
      )}
      <DataLoader
        to="response"
        loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
          content: rows, pagination, sort,
        })}
        watch={`${mode}${dataGripStore.dataGrip.hash}`}
      >
        <WeekView
          mode={mode}
          rowsForExcel={rows}
        />
        {mode !== 'print' && <Pagination />}
      </DataLoader>
    </>
  );
});

export default Week;
