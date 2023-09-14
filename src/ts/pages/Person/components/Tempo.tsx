import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';
import { getShortDateRange } from 'ts/helpers/formatter';
import localization from 'ts/helpers/Localization';

import UiKitButton from 'ts/components/UiKit/components/Button';
import PageWrapper from 'ts/components/Page/wrapper';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import TempoChart from 'ts/components/Tempo';
import Title from 'ts/components/Title';

import uiKitStyle from 'ts/components/UiKit/styles/index.module.scss';
import style from 'ts/pages/Team/styles/filters.module.scss';

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

const Tempo = observer((): React.ReactElement => {
  const { userId } = useParams<any>();
  const author = dataGripStore.dataGrip.author.statistic[userId || 0];

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
        </div>
      </PageWrapper>
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={() => getFakeLoader(partOfData)}
          watch={week}
        >
          <TempoView
            user={author.author}
          />
          <Pagination />
        </DataLoader>
      </PageWrapper>
    </>
  );
});

export default Tempo;
