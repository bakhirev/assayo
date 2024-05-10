import React from 'react';
import { Link } from 'react-router-dom';

import themeSettings from 'ts/store/ThemeSettings';

import style from 'ts/components/CardWithIcon/index.module.scss';

interface ICardWithBannerProps {
  long?: boolean;
}

function CardWithBanner({
  long = false,
}: ICardWithBannerProps): React.ReactElement | null {
  const config = themeSettings.getBanner();
  if (!config) return null;

  const { link, banner } = config;
  const className = long
    ? style.card_with_icon_long
    : style.card_with_icon;

  return (
    <Link
      to={link || ''}
      target="_blank"
      className={className}
      style={{ backgroundImage: `url(${banner})` }}
    />
  );
}

export default CardWithBanner;
