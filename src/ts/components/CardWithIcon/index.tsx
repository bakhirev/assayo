import React from 'react';

import localization  from 'ts/helpers/Localization';
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
        {localization.get(title)}
      </h4>
      <figcaption className={style.card_with_icon_description}>
        {localization.get(description)}
      </figcaption>
    </figure>
  );
}

CardWithIcon.defaultProps = {
  description: '',
  suffix: '',
  color: undefined,
  icon: undefined,
};

export default CardWithIcon;
