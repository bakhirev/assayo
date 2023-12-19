import React, { useState } from 'react';

import dataGripStore from 'ts/store/DataGrip';
import { getDate, getDateByTimestamp } from 'ts/helpers/formatter';

import Recommendations from 'ts/components/Recommendations';
import NothingFound from 'ts/components/NothingFound';
import PageWrapper from 'ts/components/Page/wrapper';
import BarChart from 'ts/components/BarChart';
import DayInfo from 'ts/components/DayInfo';
import Title from 'ts/components/Title';
import RECOMMENDATION_TYPES from 'ts/helpers/Recommendations/contstants';
import localization from 'ts/helpers/Localization';


interface ICommitsProps {
  statistic: any;
}

function Commits({ statistic }: ICommitsProps) {
  const maxData = statistic.commitsByTimestampCounter.maxData;

  const [selected, setSelected] = useState<any>(maxData);

  const dots = statistic.allCommitsByTimestamp
    .map((dot: any) => ({
      title: `${dot.timestamp} - ${dot.commits} коммитов`,
      value: dot.commits,
      meta: dot,
    }));
  if (!dots?.length) return (<NothingFound />);


  const [fullDay, shortDay] = getDateByTimestamp(maxData.timestamp);
  const recommendations = [
    {
      title: fullDay,
      description: 'page.common.commits.description',
      type: RECOMMENDATION_TYPES.FACT,
      arguments: {
        description: [shortDay],
      },
    },
  ];

  return (
    <>
      <Recommendations recommendations={recommendations} />
      <Title title="page.common.commits.title"/>
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
      <Title title={localization.get(
        'page.common.commits.title2',
        getDate(selected?.timestamp),
        selected?.commits,
      )} />
      <PageWrapper template="box">
        <DayInfo
          day={selected}
          order={dataGripStore.dataGrip.author.list}
        />
      </PageWrapper>
    </>
  );
}

export default Commits;
