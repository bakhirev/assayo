import React, { useState } from 'react';

import dataGripStore from 'ts/store/DataGrip';
import { getDate, getDateByTimestamp } from 'ts/helpers/formatter';

import RecommendationsWrapper from 'ts/components/Recommendations/wrapper';
import NothingFound from 'ts/components/NothingFound';
import PageWrapper from 'ts/components/Page/wrapper';
import BarChart from 'ts/components/BarChart';
import DayInfo from 'ts/components/DayInfo';
import Title from 'ts/components/Title';

interface IChangesProps {
  statistic: any;
}

function Changes({ statistic }: IChangesProps) {
  const maxData = statistic.changesByTimestampCounter.maxData;

  const [selected, setSelected] = useState<any>(maxData);

  const dots = statistic.allCommitsByTimestamp
    .map((dot: any) => ({
      title: `${dot.timestamp} - ${dot.addedAndChanges} строк изменили`,
      value: dot.addedAndChanges,
      meta: dot,
    }));
  if (!dots?.length) return (<NothingFound />);

  const [fullDay, shortDay] = getDateByTimestamp(maxData.timestamp);
  const recommendations = [
    [fullDay, ` (${shortDay}) было влито больше всего изменений.`, 'fact'],
  ];

  return (
    <>
      <RecommendationsWrapper recommendations={recommendations} />
      <Title title="Количество изменённых строк по дням"/>
      <PageWrapper template="box">
        <BarChart
          dots={dots}
          selected={selected}
          onClick={(dot: any) => {
            setSelected(dot.meta);
          }}
        />
      </PageWrapper>
      <br/>
      <br/>
      <Title title={`${getDate(selected?.timestamp)} изменили ${selected?.addedAndChanges || '_'} строк`}/>
      <PageWrapper template="box">
        <DayInfo
          day={selected}
          order={dataGripStore.dataGrip.author.list}
        />
      </PageWrapper>
    </>
  );
}

export default Changes;
