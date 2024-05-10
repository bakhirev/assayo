import React from 'react';
import { Link } from 'react-router-dom';

import themeSettings from 'ts/store/ThemeSettings';

import style from '../../styles/logo.module.scss';

interface ILogoProps {
  center?: boolean;
}

function Logo({ center }: ILogoProps) {
  const {
    isDefault,
    icon,
    link,
    title,
    isOpenInNewTab,
  } = themeSettings.getLogo();

  return (
    <figure
      className={center
        ? `${style.logo} ${style.logo_center}`
        : style.logo}
    >
      <Link
        to={link || ''}
        target={isOpenInNewTab ? '_blank' : ''}
        className={style.logo_link}
      >
        <img
          src={icon || ''}
          title={title || ''}
          className={isDefault
            ? `${style.logo_icon} ${style.logo_default}`
            : style.logo_icon}
        />
      </Link>
    </figure>
  );
}

Logo.defaultProps = {
  center: false,
};

export default Logo;
