import React from 'react';

import RecommendationsWrapper from 'ts/components/Recommendations/wrapper';
import NothingFound from 'ts/components/NothingFound';
import PageWrapper from 'ts/components/Page/wrapper';
import CandyChart from 'ts/components/CandyChart';
import Title from 'ts/components/Title';
import localization from 'ts/helpers/Localization';

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

  // dots[0].color = COLOR.FIRST;
  const recommendations = [
    [dots[0].title,
      localization.get('page.common.words.description', dots[0].value),
      'fact',
    ],
  ];

  return (
    <>
      {mode !== 'print' && (
        <RecommendationsWrapper recommendations={recommendations} />
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
