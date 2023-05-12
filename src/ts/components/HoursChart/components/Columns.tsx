import React from 'react';

import style from '../index.module.scss';

interface IColumnsProps {
  week: number[];
  day: number;
  max: number;
}

function getPercentByMax(countCommit: number, max: number) {
  const value = ((countCommit || 0) * 100) / max;
  return (value - value % 1) / 100;
}

function Columns({ week, day, max }: IColumnsProps): React.ReactElement | null {
  const items = week.map((countCommit, hour: number) => {
    const opacity = getPercentByMax(countCommit, max);
    const isWeekend = day > 4 || hour < 7 || hour > 20;
    const color = opacity > 0.2 ? '#FFFFFF' : '#CBCBCD';
    const backgroundColor = isWeekend ? '237, 103, 95' : '65, 98, 181';
    return (
      <div
        key={hour}
        className={style.hour}
        style={{
          color,
          backgroundColor: `rgba(${backgroundColor}, ${opacity})`,
        }}>
        {countCommit ? countCommit : ''}
      </div>
    );
  });

  return (<>{items}</>);
}

export default Columns;
