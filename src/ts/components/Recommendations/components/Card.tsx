import React from 'react';

import Description from 'ts/components/Description';
import style from '../styles/card.module.scss';

interface IRecommendationsProps {
  recommendation: any;
}

function Card({
  recommendation,
}: IRecommendationsProps) {
  if (!recommendation) return null;

  const [title, description, type] = recommendation;
  
  let formattedTitle = title || '';
  if (Array.isArray(title)) {
    formattedTitle = title.length > 1
      ? `${title[0]} +${title.length - 1}`
      : title[0];
  }

  const className = {
    info: style.card_info,
    fact: style.card_fact,
    warning: style.card_warning,
    error: style.card_error,
  }[type || 'info'] ?? style.card_fact;

  const parts = (description || '').split('\n');
  const previewText = parts.shift();
  const mainText = parts.join('\n');

  return (
    <div className={`${style.card} ${className}`}>
      <div className={style.card_wrapper}>
        <h5 className={style.card_title}>
          <span className={style.card_icon}></span>
          {formattedTitle}
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
