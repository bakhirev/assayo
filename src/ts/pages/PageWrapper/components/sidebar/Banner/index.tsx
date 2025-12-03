import React from 'react';
import { Link } from 'react-router-dom';

import themeSettings from 'ts/store/ThemeSettings';
import style from './index.module.scss';

export default function SideBarBanner() {
  const {
    link,
    text,
    isOpenInNewTab,
  } = themeSettings.getConfig() || {};

  if (!isOpenInNewTab) return null;

  return (
    <Link
      to={link || ''}
      target="_blank"
      className={style.sidebar_banner}
    >
      {`при информационной поддержке ${text}`}
    </Link>
  );
}
