import React from 'react';

import { get2Number } from 'ts/helpers/formatter';
import style from '../index.module.scss';

function Header(): React.ReactElement | null {
  const items = (new Array(25)).fill(1).map((a, hour: number) => {
    if (!hour) return (
      <div
        key={hour}
        className={style.day_name}
      ></div>
    );

    return (
      <div
        key={hour}
        className={style.day_time}
      >
        <span className={style.day_time_hh}>
          {get2Number(hour - 1)}
        </span>
        <span className={style.day_time_mm}>
          :00
        </span>
      </div>
    );
  });

  return (<>{items}</>);
}

export default Header;
