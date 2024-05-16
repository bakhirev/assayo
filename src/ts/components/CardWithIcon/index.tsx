import React from 'react';
import { useTranslation } from 'react-i18next';

import style from './index.module.scss';

interface ICardWithIconProps {
  title: string;
  description?: string;
  value: number | string | null;
  suffix?: string;
  color?: string;
  icon?: string;
  long?: boolean;
}

function CardWithIcon({
  title,
  description,
  value,
  suffix,
  color,
  icon,
  long = false,
}: ICardWithIconProps): React.ReactElement | null {
  const { t } = useTranslation();
  if (!value && value !== 0) return null;

  return (
    <figure className={long
      ? style.card_with_icon_long
      : style.card_with_icon}>
      {icon && (
        <img
          className={style.card_with_icon_icon}
          src={icon}
        />
      )}
      <p
        className={style.card_with_icon_value}
        style={{ color: color || '' }}
      >
        {value}
        {suffix || ''}
      </p>
      <h4 className={style.card_with_icon_title}>
        {t(title || '')}
      </h4>
      <figcaption className={style.card_with_icon_description}>
        {t(description || '')}
      </figcaption>
    </figure>
  );
}

CardWithIcon.defaultProps = {
  description: '',
  suffix: '',
  color: undefined,
  icon: undefined,
  long: false,
};

export default CardWithIcon;
