import React from 'react';
import { useParams } from 'react-router-dom';

import localization from 'ts/helpers/Localization';

import style from '../../styles/light_header.module.scss';

function LightHeader() {
  const { type, page } = useParams<any>();
  const title = type && page
    ? localization.get(`sidebar.${type}.${page}`)
    : localization.get('sidebar.team.total');

  return (
    <header className={style.light_header}>
      <div
        className={style.light_header_button}
        onClick={() => {
          console.log('x');
        }}
      />
      <h2 className={style.light_header_title}>
        {title}
      </h2>
      <div
        className={style.light_header_button}
        onClick={() => {
          console.log('x');
        }}
      />
    </header>
  );
}

export default LightHeader;
