import React from 'react';
import { observer } from 'mobx-react-lite';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import PageWrapper from 'ts/components/Page/wrapper';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import sendFakeRequest from 'ts/components/DataLoader/helpers/formatter';
import NothingFound from 'ts/components/NothingFound';
import TempoChart from 'ts/components/Tempo';

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

const Tempo = observer(({ user, filters }: IPersonCommonProps): React.ReactElement => {
  const rows = dataGripStore.dataGrip.timestamp.statistic.allCommitsByTimestamp || [];

  if (!rows?.length) return (<NothingFound />);

  const partOfData = getPartOfData({ week: filters.week, user: user.author }, rows);
  if (!partOfData?.length) return (<NothingFound />);

  return (
    <>
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={() => sendFakeRequest({ content: partOfData })}
          watch={JSON.stringify(filters)}
        >
          <TempoView user={user.author}/>
          <Pagination />
        </DataLoader>
      </PageWrapper>
    </>
  );
});

export default Tempo;
