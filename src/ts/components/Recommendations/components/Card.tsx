import React from 'react';
import { useTranslation } from 'react-i18next';

import Description from 'ts/components/Description';
import UiKitButton from 'ts/components/UiKit/components/Button';
import localization from 'ts/helpers/Localization';
import RECOMMENDATION_TYPES from 'ts/helpers/Recommendations/contstants';
import isMobile from 'ts/helpers/isMobile';

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
  onClick: Function;
}

function Card({
  recommendation,
  onClick,
}: IRecommendationsProps) {
  const { t } = useTranslation();

  if (!recommendation) return null;

  const className = getClassName(recommendation);
  const title = getFormattedTitle(recommendation);
  const titleArgs = recommendation?.arguments?.title;
  const parts = getDescriptionText(recommendation).split('\n');
  const previewText = parts.shift();

  return (
    <div
      className={`${style.recommendations_card} ${className}`} // @ts-ignore
      onClick={isMobile ? onClick : undefined}
    >
      <h5 className={style.recommendations_card_title}>
        <span className={style.recommendations_card_icon}></span>
        {localization.get(title, titleArgs)}
      </h5>
      <Description
        style={{ color: '#12131B' }}
        text={previewText || ''}
      />
      {!isMobile && (
        <UiKitButton
          mode="link"
          className={style.recommendations_card_button}
          onClick={onClick}
        >
          {t('recommendations.modal.open')}
        </UiKitButton>
      )}
    </div>
  );
}

export default Card;
