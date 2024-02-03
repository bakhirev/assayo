import React from 'react';

import Title from 'ts/components/Title';
import localization from 'ts/helpers/Localization';

import Card from './components/Card';
import CardForPrint from './components/CardForPrint';
import recommendationStore from './store/index';
import style from './styles/index.module.scss';

interface IRecommendationsProps {
  recommendations: any[];
  mode?: string;
}

function Recommendations({
  recommendations,
  mode,
}: IRecommendationsProps) {
  const cards = (recommendations || [])
    .filter(item => item)
    .map((recommendation) => (mode === 'print' ? (
      <CardForPrint
        key={recommendation[1]}
        recommendation={recommendation}
      />
    ) : (
      <Card
        key={recommendation[1]}
        recommendation={recommendation}
        onClick={() => {
          recommendationStore.open(recommendation);
        }}
      />
    )));

  if (!cards.length) return null;

  const title = localization.get('recommendations.title');
  const className = mode === 'print'
    ? `${style.recommendations_container} ${style.recommendations_container_for_print}`
    : style.recommendations_container;

  return (
    <>
      <Title title={title}/>
      <div className={className}>
        {cards}
      </div>
    </>
  );
}

Recommendations.defaultProps = {
  mode: undefined,
};

export default Recommendations;
