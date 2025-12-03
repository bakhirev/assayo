import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import { DataLoader } from 'ts/components/DataLoader';
import sendFakeRequest from 'ts/components/DataLoader/helpers/formatter';
import TempoChart from 'ts/components/Tempo';
import { Title, NothingFound, Section, SectionWithBg } from 'ts/components/Layout';

import TempoFilters from './Filters';

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
  const users = dataGripStore.dataGrip.author.list || [];
  const firstIndex = rows.length - 1;
  const firstPoint = rows[firstIndex];

  const [filters, setFilters] = useState<any>({ user: 0, week: firstPoint.week });
  const user = filters.user
    ? users[filters.user - 1]
    : '';

  if (!rows?.length) return (<NothingFound />);

  const partOfData = getPartOfData({ week: filters.week, user }, rows);
  if (!partOfData?.length) return (<NothingFound />);

  return (
    <>
      <Title title="common.filters" />
      <Section>
        <TempoFilters
          filters={filters}
          onChange={setFilters}
        />
      </Section>
      <br/>
      <SectionWithBg>
        <DataLoader
          loader={() => sendFakeRequest({ content: partOfData })}
          watch={JSON.stringify(filters)}
        >
          <TempoView
            order={users}
            user={user}
          />
        </DataLoader>
      </SectionWithBg>
    </>
  );
});

export default Tempo;
