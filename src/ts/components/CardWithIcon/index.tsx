import React from 'react';
import { useTranslation } from 'react-i18next';

import type { IScoringProps } from './components/Scoring';
import Scoring from './components/Scoring';
import style from './index.module.scss';

interface ICardWithIconProps {
  title: string;
  description?: string;
  value: number | string | null;
  suffix?: string;
  icon?: string;
  size?: 's' | 'm' | 'l';
  scoring?: IScoringProps;
}

function CardWithIcon({
  title,
  description,
  value,
  suffix,
  icon,
  size,
  scoring,
}: ICardWithIconProps): React.ReactElement | null {
  const { t } = useTranslation();

  if (!value && value !== 0) return null;

  const formattedTitle = t(title || '');
  const className = [style.card_with_icon];
  if (size === 's') className.push(style.card_with_icon_small);
  if (size === 'l') className.push(style.card_with_icon_long);

  return (
    <figure className={className.join(' ')}>
      {icon && (
        <img
          className={style.card_with_icon_icon}
          alt={formattedTitle}
          src={icon}
        />
      )}

      <p className={style.card_with_icon_value}>
        {value}
        {suffix || ''}
      </p>

      <h4 className={style.card_with_icon_title}>
        {formattedTitle}
      </h4>

      <figcaption className={style.card_with_icon_description}>
        {t(description || '')}
      </figcaption>

      {scoring ? (
        <Scoring
          title={scoring?.title}
          value={scoring?.value}
          total={scoring?.total}
        />
      ) : null}
    </figure>
  );
}

CardWithIcon.defaultProps = {
  description: '',
  suffix: '',
  icon: undefined,
  size: 'm',
  scoring: undefined,
};

export default CardWithIcon;
