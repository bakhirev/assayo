import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'ts/components/Translation';

import style from '../../styles/header.module.scss';

function Logo() {
  const { t } = useTranslation();
  const { type, page } = useParams<any>();
  const title = type && page
    ? t(`sidebar.${type}.${page}`)
    : t('sidebar.team.total');

  return (
    <h2 className={style.header_title}>
      {title}
    </h2>
  );
}

export default Logo;
