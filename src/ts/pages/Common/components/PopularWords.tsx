import React from 'react';

import Recommendations from 'ts/components/Recommendations';
import NothingFound from 'ts/components/NothingFound';
import PageWrapper from 'ts/components/Page/wrapper';
import CandyChart from 'ts/components/CandyChart';
import Title from 'ts/components/Title';
import RECOMMENDATION_TYPES from 'ts/helpers/Recommendations/contstants';

interface IPopularWordsProps {
  statistic: any[];
  mode?: string;
}

function PopularWords({ statistic, mode }: IPopularWordsProps) {
  const limit = mode === 'print' ? 20 : 40;
  const dots = statistic
    .slice(0, limit)
    .map((titleValue: any) => ({
      title: titleValue[0],
      value: titleValue[1],
    }));

  if (!dots?.length) return (<NothingFound />);

  const recommendations = [
    {
      title: dots[0].title,
      description: 'page.common.words.description',
      type: RECOMMENDATION_TYPES.FACT,
      arguments: {
        description: [dots[0].value],
      },
    },
  ];

  return (
    <>
      {mode !== 'print' && (
        <Recommendations recommendations={recommendations} />
      )}
      <Title title="page.common.words.title"/>
      <PageWrapper template="table">
        <CandyChart
          dots={dots}
        />
      </PageWrapper>
    </>
  );
}

export default PopularWords;
