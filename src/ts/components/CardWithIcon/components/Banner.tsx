import React from 'react';

import Banner from 'ts/components/Banner';

import style from '../index.module.scss';

interface ICardWithBannerProps {
  long?: boolean;
}

function CardWithBanner({
  long = false,
}: ICardWithBannerProps): React.ReactElement | null {
  const className = long
    ? style.card_with_icon_long
    : style.card_with_icon;

  return (
    <Banner className={`${className} ${style.card_with_icon_banner}`} />
  );
}

CardWithBanner.defaultProps = {
  long: false,
};

export default CardWithBanner;
