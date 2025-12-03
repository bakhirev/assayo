import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import themeSettings from 'ts/store/ThemeSettings';

import style from './index.module.scss';

interface LogoProps {
  showDescription?: boolean;
}

function Logo({
  showDescription,
}: LogoProps) {
  const {
    logo,
    link,
    text,
    isOpenInNewTab,
  } = themeSettings.getConfig() || {};

  const [formattedLogo, setLogo] = useState<string>(logo || '');
  const offsetWidth = document.body.offsetWidth;

  useLayoutEffect(() => {
    if (isOpenInNewTab) return;
    const url = offsetWidth < 1000
      ? './assets/logo/middle.svg'
      : './assets/logo.svg';
    setLogo(url);
  }, [offsetWidth]);

  return (
    <figure className={style.logo}>
      <Link
        to={link || ''}
        target={isOpenInNewTab ? '_blank' : ''}
        className={style.logo_icon_link}
      >
        <img
          alt="assayo"
          src={formattedLogo}
          title="assayo"
          className={style.logo_icon}
        />
      </Link>
      {link && showDescription ? (
        <p className={style.logo_text}>
          при информационной поддержке {text}
        </p>
      ) : null}
    </figure>
  );
}

Logo.defaultProps = {
  showDescription: false,
};

export default Logo;
