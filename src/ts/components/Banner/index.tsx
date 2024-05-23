import React from 'react';
import { Link } from 'react-router-dom';

import themeSettings from 'ts/store/ThemeSettings';

import style from './index.module.scss';

interface IBannerProps {
  className: string;
}

function Banner({ className }: IBannerProps) {
  const config = themeSettings.getBanner();
  if (!config) return null;

  const {
    ref,
    link,
    title,
    banner,
    bannerText,
    color,
    backgroundColor,
  } = config;

  const props = {
    title,
    to: link || '',
    target: '_blank',
    className,
  };

  if (banner) {
    return (
      <Link {...props}>
        <div
          className={style.banner}
          style={{
            backgroundImage: `url(${banner})`,
          }}
        />
      </Link>
    );
  }

  if (!banner) {
    const textFromRef = (ref || '').split('_').splice(1).join(' ').toUpperCase();
    const background = backgroundColor
      ? backgroundColor
      : 'linear-gradient(135deg, rgba(64,117,252,1) 0%, rgba(172,179,246,1) 100%)';

    return (
      <Link {...props}>
        <div
          title={title}
          className={style.banner}
          style={{
            color: color,
            background,
          }}
        >
          {bannerText || textFromRef || ''}
        </div>
      </Link>
    );
  }

  return null;
}

export default Banner;
