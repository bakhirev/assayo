import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';
import { getShortDateRange } from 'ts/helpers/formatter';

import UiKitButton from 'ts/components/UiKit/components/Button';
import PageWrapper from 'ts/components/Page/wrapper';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import TempoChart from 'ts/components/Tempo';

import uiKitStyle from 'ts/components/UiKit/styles/index.module.scss';
import style from 'ts/pages/Team/styles/filters.module.scss';

import IPersonCommonProps from '../interfaces/CommonProps';

interface ITempoViewProps {
  user?: string;
  response?: IPagination<any>;
}

function TempoView({ response, user }: ITempoViewProps) {
  if (!response) return null;
  return (
    <TempoChart
      days={response.content as any[]}
      author={user}
    />
  );
}

TempoView.defaultProps = {
  response: undefined,
};

function getPartOfData(filters: any, rows: any[]) {
  return rows.filter((row: any) => (row.week === filters.week)).slice(0, 7);
}

const Tempo = observer(({ user }: IPersonCommonProps): React.ReactElement => {
  const author = user;

  const rows = dataGripStore.dataGrip.timestamp.statisticByAuthor[author.author]?.allCommitsByTimestamp || [];
  const firstIndex = rows.length - 1;
  const firstPoint = rows[firstIndex];

  const [week, setWeek] = useState<number>(firstPoint.week);

  if (!rows?.length) return (<NothingFound />);
  const partOfData = getPartOfData({ week, user: author.author }, rows);
  const firstWeekDay = partOfData[0];
  const lastWeekDay = partOfData[partOfData.length - 1];

  if (!partOfData?.length) return (<NothingFound />);
  return (
    <>
      <PageWrapper>
        <div className={style.tempo_filters}>
          <UiKitButton
            mode="second"
            disabled={week === 1}
            onClick={() => {
              setWeek(week - 1);
            }}
          >
            «
          </UiKitButton>
          <div className={`${uiKitStyle.ui_kit_common} ${style.tempo_filters_date_range}`}>
            {getShortDateRange({
              from: firstWeekDay.timestamp,
              to: lastWeekDay.timestamp,
            })}
          </div>
          <UiKitButton
            mode="second"
            disabled={week === firstPoint.week}
            onClick={() => {
              setWeek(week + 1);
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
          watch={week}
        >
          <TempoView user={author.author}/>
          <Pagination />
        </DataLoader>
      </PageWrapper>
    </>
  );
});

export default Tempo;
