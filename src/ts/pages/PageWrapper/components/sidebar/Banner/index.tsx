import React from 'react';
import { Link } from 'react-router-dom';

import referenceStore from 'ts/store/ReferenceStore';
import style from './index.module.scss';

export default function SideBarBanner() {
  const {
    link,
    text,
    isOpenInNewTab,
  } = referenceStore.getBanner() || {};

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
