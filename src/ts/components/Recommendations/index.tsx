import React from 'react';

import Title from 'ts/components/Title';
import localization from 'ts/helpers/Localization';

import Card from './components/Card';
import recommendationStore from './store/index';
import style from './styles/index.module.scss';

interface IRecommendationsProps {
  recommendations: any[];
}

function Recommendations({
  recommendations,
}: IRecommendationsProps) {

  const cards = (recommendations || [])
    .filter(item => item)
    .map((recommendation) => (
      <Card
        key={recommendation[1]}
        recommendation={recommendation}
        onClick={() => {
          recommendationStore.open(recommendation);
        }}
      />
    ));

  if (!cards.length) return null;

  const title = localization.get('recommendations.title');

  return (
    <>
      <Title title={title}/>
      <div className={style.recommendations_container}>
        {cards}
      </div>
    </>
  );
}


export default Recommendations;
