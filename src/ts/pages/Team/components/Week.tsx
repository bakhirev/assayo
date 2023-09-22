import React from 'react';
import { observer } from 'mobx-react-lite';

import ISort from 'ts/interfaces/Sort';
import IHashMap from 'ts/interfaces/HashMap';
import { IPaginationRequest, IPagination } from 'ts/interfaces/Pagination';
import { getShortDateRange } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import PageWrapper from 'ts/components/Page/wrapper';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import Table from 'ts/components/Table';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import RecommendationsWrapper from 'ts/components/Recommendations/wrapper';

import { getMax } from 'ts/pages/Common/helpers/getMax';

interface IWeekViewProps {
  response?: IPagination<any>;
  updateSort?: Function;
}

function WeekView({ response, updateSort }: IWeekViewProps) {
  if (!response) return null;

  const tasksChart = getOptions({ max: getMax(response, 'tasks'), order: dataGripStore.dataGrip.type.list });
  const authorsChart = getOptions({ max: getMax(response, 'authorsLength'), order: dataGripStore.dataGrip.author.list, suffix: 'задач' });
  const changesChart = getOptions({ max: getMax(response, 'changesLength'), order: ['добавили', 'изменили', 'удалили'], suffix: 'строк' });
  const workDaysTotalChart = getOptions({ order: ['были коммиты', 'небыло коммитов'], suffix: 'дней' });
  const workDaysChart = getOptions({ order: dataGripStore.dataGrip.author.list, suffix: 'дней' });

  return (
    <Table
      rows={response.content}
      sort={response.sort}
      updateSort={updateSort}
    >
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        title="Дата"
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
        title="Количество задач"
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
        title="Количество человек"
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
        title="Изменения строк"
        template={(row: any) => (
          <LineChart
            options={changesChart}
            value={row.changesLength}
            details={{
              'добавили': row?.changes?.added,
              'изменили': row?.changes?.changes,
              'удалили': row?.changes?.removed,
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
        title="Дни с коммитами и без"
        template={(row: any) => (
          <LineChart
            options={workDaysTotalChart}
            details={{ // TODO: ошибка суммы, т.к. 5 дневка не у всех. Нужно по автору перебирать.
              'были коммиты': row?.workDaysTotal,
              'небыло коммитов': row?.authorsLength * 5 - row?.workDaysTotal,
            }}
          />
        )}
        minWidth={200}
      />
      <Column
        title="Кто не коммитил"
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
    </Table>
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
      {mode !== 'print' && (
        <RecommendationsWrapper recommendations={recommendations} />
      )}
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={(pagination?: IPaginationRequest, sort?: ISort[]) => getFakeLoader({
            content: rows, pagination, sort,
          })}
        >
          <WeekView />
          {mode !== 'print' && <Pagination />}
        </DataLoader>
      </PageWrapper>
    </>
  );
});

export default Week;
