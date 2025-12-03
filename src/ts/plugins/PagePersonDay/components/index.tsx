import React from 'react';
import { observer } from 'mobx-react-lite';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import { DataLoader, Pagination } from 'ts/components/DataLoader';
import sendFakeRequest from 'ts/components/DataLoader/helpers/formatter';
import { NothingFound, SectionWithBg } from 'ts/components/Layout';
import TempoChart from 'ts/components/Tempo';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';

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

const Tempo = observer(({ user, filters }: PageOptions): React.ReactElement => {
  const rows = dataGripStore.dataGrip.timestamp.statistic.allCommitsByTimestamp || [];

  if (!rows?.length) return (<NothingFound />);

  const partOfData = getPartOfData({ week: filters.week, user: user.author }, rows);
  if (!partOfData?.length) return (<NothingFound />);

  return (
    <>
      <SectionWithBg>
        <DataLoader
          loader={() => sendFakeRequest({ content: partOfData })}
          watch={JSON.stringify(filters)}
        >
          <TempoView user={user.author}/>
          <Pagination />
        </DataLoader>
      </SectionWithBg>
    </>
  );
});

export default Tempo;
