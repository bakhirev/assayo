import React from 'react';

import { useTranslation } from 'ts/components/Translation';
import { MARKER } from 'ts/helpers/copyPasteFormatter';

import type { IScoringProps } from './components/Scoring';
import Scoring from './components/Scoring';
import style from './index.module.scss';

interface ICardWithIconProps {
  title: string;
  description?: string;
  value?: number | string | null;
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
  const { t, text } = useTranslation();

  if (!value && value !== 0) return null;

  const className = [style.card_with_icon];
  if (size === 'l') className.push(style.card_with_icon_long);
  if (size === 's') className.push(style.card_with_icon_small);

  return (
    <figure className={className.join(' ')}>
      {icon && (
        <img
          className={style.card_with_icon_icon}
          alt={text(title || '')}
          src={icon}
        />
      )}

      <p className={style.card_with_icon_value}>
        {MARKER}
        {value}
        {suffix || ''}
      </p>

      <h4 className={style.card_with_icon_title}>
        {t(title || '')}
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
