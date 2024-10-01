import React from 'react';

import Title from 'ts/components/Title';
import { t } from 'ts/helpers/Localization';
import Banner from 'ts/components/Banner';

import Card from './components/Card';
import CardForPrint from './components/CardForPrint';
import recommendationStore from './store/index';
import styleCard from './styles/card.module.scss';
import style from './styles/index.module.scss';

function addBannerInRandomIndex(list: any[]) {
  const className = `${styleCard.recommendations_card} ${styleCard.recommendations_card_banner}`;
  const item = (
    <Banner
      key="banner"
      className={className}
    />
  );

  const index = Math.floor(Math.random() * list.length);
  const last = list.splice(index);
  return [...list, item, ...last];
}

interface IRecommendationsProps {
  recommendations: any[];
  mode?: string;
}

function Recommendations({
  recommendations,
  mode,
}: IRecommendationsProps) {
  let cards = (recommendations || [])
    .filter(item => item)
    .map((recommendation) => (mode === 'print' ? (
      <CardForPrint
        key={recommendation.description}
        recommendation={recommendation}
      />
    ) : (
      <Card
        key={recommendation.description}
        recommendation={recommendation}
        onClick={() => {
          recommendationStore.open(recommendation);
        }}
      />
    )));

  if (!cards.length) return null;
  if (mode !== 'print') {
    cards = addBannerInRandomIndex(cards);
  }

  const title = t('recommendations.title');
  const className = mode === 'print'
    ? `${style.recommendations_container} scroll_x ${style.recommendations_container_for_print}`
    : `${style.recommendations_container} scroll_x`;

  return (
    <>
      <Title title={title}/>
      <div
        className={className}
        onTouchStart={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {cards}
      </div>
    </>
  );
}

Recommendations.defaultProps = {
  mode: undefined,
};

export default Recommendations;
