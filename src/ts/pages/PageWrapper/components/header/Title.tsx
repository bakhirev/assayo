import React from 'react';
import { useParams } from 'react-router-dom';

import localization from 'ts/helpers/Localization';
import style from '../../styles/header.module.scss';

function Logo() {
  const { type, page } = useParams<any>();
  const title = type && page
    ? localization.get(`sidebar.${type}.${page}`)
    : localization.get('sidebar.team.total');

  return (
    <h2 className={style.header_title}>
      {title}
    </h2>
  );
}

export default Logo;
