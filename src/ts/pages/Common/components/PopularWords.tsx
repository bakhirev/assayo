import React from 'react';

import RecommendationsWrapper from 'ts/components/Recommendations/wrapper';
import NothingFound from 'ts/components/NothingFound';
import PageWrapper from 'ts/components/Page/wrapper';
import CandyChart from 'ts/components/CandyChart';
import Title from 'ts/components/Title';

interface IPopularWordsProps {
  statistic: any[];
}

function PopularWords({ statistic }: IPopularWordsProps) {
  const dots = statistic
    .slice(0, 40)
    .map((titleValue: any) => ({
      title: titleValue[0],
      value: titleValue[1],
    }));

  if (!dots?.length) return (<NothingFound />);

  // dots[0].color = COLOR.FIRST;
  const recommendations = [
    [dots[0].title, `самое популярное слово. Встречается ${dots[0].value} раза.`, 'fact'],
  ];

  return (
    <>
      <RecommendationsWrapper recommendations={recommendations} />
      <Title title="Статистика по словам"/>
      <PageWrapper template="table">
        <CandyChart
          dots={dots}
        />
      </PageWrapper>
    </>
  );
}

export default PopularWords;
