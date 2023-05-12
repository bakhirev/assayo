import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import HoursChart from 'ts/components/HoursChart';
import Title from 'ts/components/Title';

import PageWrapper from 'ts/components/Page/wrapper';

const Hours = observer((): React.ReactElement => {
  const { userId } = useParams<any>();
  const statistic = dataGripStore.dataGrip.author.statistic[userId || 0];

  return (
    <>
      <Title title="Распределение коммитов в течении каждого дня недели"/>
      <PageWrapper template="table">
        <HoursChart statistic={statistic} />
      </PageWrapper>
    </>
  );
});

export default Hours;
