import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import referenceStore from 'ts/store/ReferenceStore';
import applicationConfig from 'ts/store/ApplicationConfig';

import style from './index.module.scss';

interface LogoProps {
  showDescription?: boolean;
  className?: string;
}

const Logo = observer(({
  showDescription,
  className,
}: LogoProps) => {
  const {
    link,
    text,
    isOpenInNewTab,
  } = referenceStore.getBanner() || {};

  const logo = applicationConfig.config?.logo;

  return (
    <figure className={`${style.logo} ${className || ''}`}>
      <Link
        to={link || ''}
        target={isOpenInNewTab ? '_blank' : ''}
        className={style.logo_icon_link}
      >
        <img
          alt=""
          src={logo}
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
});

export default Logo;
