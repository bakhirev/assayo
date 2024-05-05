import React from 'react';
import { Link } from 'react-router-dom';

import themeSettings from 'ts/store/ThemeSettings';

import style from '../../styles/logo.module.scss';

function Logo() {
  const {
    icon, link, title, isOpenInNewTab,
  } = themeSettings.getLogo();

  return (
    <figure className={style.logo}>
      <Link
        to={link}
        target={isOpenInNewTab ? '_blank' : ''}
        className={style.logo_link}
      >
        <img
          src={icon}
          title={title}
          className={style.logo_icon}
        />
      </Link>
    </figure>
  );
}

export default Logo;
