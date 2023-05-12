import React from 'react';

import style from './index.module.scss';

interface IDot {
  title: string;
  value: number;
  color?: string;
}

interface ICandyChartProps {
  dots: IDot[];
}

function CandyChart({
  dots,
}: ICandyChartProps): React.ReactElement | null {
  const scale = 100 / Math.max(...dots.map((dot: IDot) => dot.value));
  const getWidth = (value: number): number => value * scale;

  const lines = dots.map((dot) => (
    <div
      key={dot.title}
      className={style.candy_item}
    >
      <div className={style.candy_title}>
        {dot.title}
      </div>
      <div className={style.candy_line}>
        <div className={style.candy_prefix}>
          {dot.value}
        </div>
        <div
          className={style.candy_value}
          style={{
            width: `${getWidth(dot.value)}%`,
            backgroundColor: dot.color || '',
          }}
        ></div>
        <div
          className={style.candy_dot}
          style={{
            backgroundColor: dot.color || '',
          }}
        ></div>
      </div>
    </div>
  ));

  return (
    <div className={style.candy}>
      {lines}
    </div>
  );
}

export default CandyChart;
