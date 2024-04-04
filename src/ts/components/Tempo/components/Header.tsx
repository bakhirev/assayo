import React from 'react';

import { getDate, getDayName } from 'ts/helpers/formatter';

import style from '../styles/index.module.scss';

interface IHeaderProps {
  dayInfo: any;
}

function Header({ dayInfo }: IHeaderProps) {
  return (
    <div className={style.tempo_header}>
      <p className={style.tempo_header_title}>
        {getDate(dayInfo?.timestamp)}
      </p>
      <p className={style.tempo_header_day}>
        {getDayName(dayInfo?.day, 'long')}
      </p>
    </div>
  );
}

export default Header;
