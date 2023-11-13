import React from 'react';

import Description from 'ts/components/Description';
import localization from 'ts/helpers/Localization';
import RECOMMENDATION_TYPES from 'ts/helpers/Recommendations/contstants';

import style from '../styles/card.module.scss';

function getClassName(recommendation?: any) {
  const type = recommendation?.type;
  return {
    [RECOMMENDATION_TYPES.INFO]: style.card_info,
    [RECOMMENDATION_TYPES.FACT]: style.card_fact,
    [RECOMMENDATION_TYPES.WARNING]: style.card_warning,
    [RECOMMENDATION_TYPES.ALERT]: style.card_error,
  }[type || RECOMMENDATION_TYPES.INFO] ?? style.card_fact;
}

function getDescriptionText(recommendation?: any) {
  const descriptionArgs = recommendation?.arguments?.description;
  const { description } = recommendation;
  const list = Array.isArray(description)
    ? description
    : [description];

  return list.map((textId: string) => (
    localization.get(textId, descriptionArgs)
  )).join('\n');
}

interface IRecommendationsProps {
  recommendation: any;
}

function Card({
  recommendation,
}: IRecommendationsProps) {
  if (!recommendation) return null;

  const { title } = recommendation;
  let formattedTitle = title || '';
  if (Array.isArray(title)) {
    formattedTitle = title.length > 1
      ? `${title[0]} +${title.length - 1}`
      : title[0];
  }

  const className = getClassName(recommendation);
  const titleArgs = recommendation?.arguments?.title;
  const parts = getDescriptionText(recommendation).split('\n');
  const previewText = parts.shift();
  const mainText = parts.join('\n');

  return (
    <div className={`${style.card} ${className}`}>
      <div className={style.card_wrapper}>
        <h5 className={style.card_title}>
          <span className={style.card_icon}></span>
          {localization.get(formattedTitle, titleArgs)}
        </h5>
        <Description
          style={{ color: '#12131B' }}
          text={previewText || ''}
        />
        <div className={style.card_shortcut}>
          <Description
            style={{ color: '#12131B' }}
            text={mainText || ''}
          />
        </div>
      </div>
    </div>
  );
}


export default Card;
