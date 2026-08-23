import React from 'react';

import { getDate, getDayName } from 'ts/helpers/formatter';

import style from '../styles/index.module.scss';

interface DayProps {
  timestamp: string;
  day: number;
}

function Day({ timestamp, day }: DayProps): React.ReactElement {
  return (
    <div className={style.tempo_like_list_day}>
      {getDate(timestamp)}
      <div className={style.tempo_like_list_day_description}>
        {getDayName(day, 'long')}
      </div>
    </div>
  );
}

export default Day;
