import React from 'react';

import { Banner } from 'ts/components/Layout';

import style from '../index.module.scss';

interface ICardWithBannerProps {
  size?: 's' | 'm' | 'l';
}

function CardWithBanner({ size }: ICardWithBannerProps): React.ReactElement | null {
  const className = [
    style.card_with_icon,
    style.card_with_icon_banner,
  ];
  if (size === 's') className.push(style.card_with_icon_small);
  if (size === 'l') className.push(style.card_with_icon_long);

  return (
    <Banner className={className.join(' ')} />
  );
}

CardWithBanner.defaultProps = {
  size: 'm',
};

export default CardWithBanner;
