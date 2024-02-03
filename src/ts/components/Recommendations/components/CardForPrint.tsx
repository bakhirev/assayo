import React from 'react';

import Description from 'ts/components/Description';
import localization from 'ts/helpers/Localization';
import RECOMMENDATION_TYPES from 'ts/helpers/Recommendations/contstants';

import { getFormattedTitle, getDescriptionText } from '../helpers';
import style from '../styles/card.module.scss';

function getClassName(recommendation?: any) {
  const type = recommendation?.type;
  return {
    [RECOMMENDATION_TYPES.INFO]: style.recommendations_card_info,
    [RECOMMENDATION_TYPES.FACT]: style.recommendations_card_fact,
    [RECOMMENDATION_TYPES.WARNING]: style.recommendations_card_warning,
    [RECOMMENDATION_TYPES.ALERT]: style.recommendations_card_error,
  }[type || RECOMMENDATION_TYPES.INFO] ?? style.recommendations_card_fact;
}

interface IRecommendationsProps {
  recommendation: any;
}

function CardForPrint({
  recommendation,
}: IRecommendationsProps) {
  if (!recommendation) return null;

  const className = getClassName(recommendation);
  const title = getFormattedTitle(recommendation);
  const titleArgs = recommendation?.arguments?.title;
  const description = getDescriptionText(recommendation);

  return (
    <div className={`${style.recommendations_card} ${style.recommendations_card_for_print} ${className}`}>
      <h5 className={style.recommendations_card_title}>
        <span className={style.recommendations_card_icon}></span>
        {localization.get(title, titleArgs)}
      </h5>
      <Description
        style={{ color: '#12131B' }}
        text={description}
      />
    </div>
  );
}


export default CardForPrint;
