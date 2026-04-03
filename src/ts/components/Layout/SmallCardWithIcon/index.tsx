import React, { ReactNode } from 'react';

import { useTranslation } from 'ts/components/Translation';
import { MARKER } from 'ts/helpers/copyPasteFormatter';

import Scoring, { type IScoringProps } from '../CardWithIcon/components/Scoring';
import style from './index.module.scss';

interface SmallCardWithIconProps {
  title: string;
  description?: string;
  value?: ReactNode | string | number | null;
  icon?: string;
  scoring?: IScoringProps;
}

function SmallCardWithIcon({
  title,
  description,
  value,
  icon,
  scoring,
}: SmallCardWithIconProps): React.ReactElement | null {
  const { t, text } = useTranslation();

  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;

  const className = style.card_with_icon_small_value;
  let help = text(description);
  if (icon) help = '';


  const isStringArray = Array.isArray(value) && typeof value?.[0] === 'string';
  const values = isStringArray
    ? value.map((item) => (
      <p
        key={item}
        className={className}
      >
        {item}
      </p>
    ))
    : <p className={className}>{MARKER}{value}</p>;

  return (
    <figure className={style.card_with_icon_small}>
      <div className={style.card_with_icon_small2}>
        {icon && (
          <img
            alt=""
            className={style.card_with_icon_small_icon}
            src={icon}
          />
        )}

        {values}

        <figcaption
          title={help}
          className={style.card_with_icon_small_title}
        >
          {t(title || '')}
        </figcaption>
      </div>

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

SmallCardWithIcon.defaultProps = {
  description: '',
  icon: undefined,
};

export default SmallCardWithIcon;
