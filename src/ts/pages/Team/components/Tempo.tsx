import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';
import { getShortDateRange } from 'ts/helpers/formatter';
import localization from 'ts/helpers/Localization';

import UiKitButton from 'ts/components/UiKit/components/Button';
import UiKitSelect from 'ts/components/UiKit/components/Select';
import PageWrapper from 'ts/components/Page/wrapper';
import DataLoader from 'ts/components/DataLoader';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import TempoChart from 'ts/components/Tempo';
import Title from 'ts/components/Title';

import uiKitStyle from 'ts/components/UiKit/styles/index.module.scss';
import style from '../styles/filters.module.scss';

interface ITempoViewProps {
  order: string[];
  user?: string;
  response?: IPagination<any>;
}

function TempoView({ response, order, user }: ITempoViewProps) {
  if (!response) return null;
  return (
    <TempoChart
      days={response.content as any[]}
      author={user}
      order={order}
    />
  );
}

TempoView.defaultProps = {
  response: undefined,
};

function getPartOfData(filters: any, rows: any[]) {
  return rows.filter((row: any) => (row.week === filters.week)).slice(0, 7);
}

const Tempo = observer((): React.ReactElement => {
  const rows = dataGripStore.dataGrip.timestamp.statistic.allCommitsByTimestamp || [];
  const order = dataGripStore.dataGrip.author.list || [];
  const firstIndex = rows.length - 1;
  const firstPoint = rows[firstIndex];

  const [week, setWeek] = useState<number>(firstPoint.week);
  const [user, setUser] = useState<string>('');

  if (!rows?.length) return (<NothingFound />);
  const partOfData = getPartOfData({ week, user }, rows);
  const firstWeekDay = partOfData[0];
  const lastWeekDay = partOfData[partOfData.length - 1];

  if (!partOfData?.length) return (<NothingFound />);
  return (
    <>
      <Title title={localization.get('common.filters')} />
      <PageWrapper>
        <div className={style.tempo_page_filters}>
          <UiKitButton
            type="second"
            disabled={week === 1}
            onClick={() => {
              setWeek(week - 1);
            }}
          >
            «
          </UiKitButton>
          <div className={`${uiKitStyle.ui_kit_common} ${style.date_range}`}>
            {getShortDateRange({
              from: firstWeekDay.timestamp,
              to: lastWeekDay.timestamp,
            })}
          </div>
          <UiKitButton
            type="second"
            disabled={week === firstPoint.week}
            onClick={() => {
              setWeek(week + 1);
            }}
          >
            »
          </UiKitButton>

          <UiKitButton
            type="second"
            onClick={() => {
              setUser(order[order.indexOf(user) - 1]);
            }}
          >
            «
          </UiKitButton>
          <UiKitSelect
            className={style.user}
            value={user}
            options={[ '', ...dataGripStore.dataGrip.author.list]}
            onChange={(id: number, name: string) => {
              setUser(name);
            }}
          />
          <UiKitButton
            type="second"
            onClick={() => {
              setUser(order[order.indexOf(user) + 1]);
            }}
          >
            »
          </UiKitButton>
        </div>
      </PageWrapper>
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={() => getFakeLoader({ content: partOfData })}
          watch={`${week}${user}`}
        >
          <TempoView
            order={order}
            user={user}
          />
        </DataLoader>
      </PageWrapper>
    </>
  );
});

export default Tempo;
