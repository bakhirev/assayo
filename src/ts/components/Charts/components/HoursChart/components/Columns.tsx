import React from 'react';

import style from '../index.module.scss';

interface IColumnsProps {
  week: number[];
  isWeekend: boolean;
  max: number;
}

function getPercentByMax(countCommit: number, max: number) {
  if (!countCommit) return 0;
  const value = (countCommit * 100) / max;
  return (value - value % 1) / 100;
}

function Columns({ week, isWeekend, max }: IColumnsProps): React.ReactElement | null {
  const items = week.map((countCommit, hour: number) => {
    const opacity = getPercentByMax(countCommit, max);
    const isHomeTime = isWeekend || hour < 7 || hour > 20;
    const color = opacity > 0.2 ? '#FFFFFF' : '#CBCBCD';
    const backgroundColor = isHomeTime ? '237, 103, 95' : '65, 98, 181';
    return (
      <div
        key={hour}
        className={style.hours_chart_hour}
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
