import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import themeSettings from 'ts/store/ThemeSettings';

import style from '../../styles/logo.module.scss';

interface ILogoProps {
  center?: boolean;
}

function Logo({ center }: ILogoProps) {
  const {
    logo,
    link,
    title,
  } = themeSettings.getLogo() || {};
  const isDefault = logo === './assets/logo.svg';
  const [formattedLogo, setLogo] = useState<string>(logo || '');
  const offsetWidth = document.body.offsetWidth;

  useLayoutEffect(() => {
    if (!isDefault || center) return;
    const url = offsetWidth < 1000
      ? './assets/logo/middle.svg'
      : './assets/logo.svg';
    setLogo(url);
  }, [offsetWidth]);

  return (
    <figure
      className={center
        ? `${style.logo} ${style.logo_center}`
        : style.logo}
    >
      <Link
        to={link || ''}
        target={isDefault ? '' : '_blank'}
        className={style.logo_link}
      >
        <img
          alt="logo"
          src={formattedLogo}
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
