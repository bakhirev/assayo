import React from 'react';
import { Link } from 'react-router-dom';

import themeSettings from 'ts/store/ThemeSettings';

import style from '../styles/card.module.scss';

function Banner() {
  const config = themeSettings.getBanner();
  if (!config) return null;

  const { link, banner } = config;

  return (
    <Link
      to={link || ''}
      target="_blank"
      className={`${style.recommendations_card} ${style.recommendations_card_banner}`}
      style={{ backgroundImage: `url(${banner})` }}
    />
  );
}

export default Banner;
