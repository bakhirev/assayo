import React, { useState } from 'react';

import HorizontalScale from './components/HorizontalScale';
import Line from './components/Line';

import style from './index.module.scss';

interface IDot {
  title: string;
  value: number;
  color?: string;
  meta?: any;
}

interface IBarCharttProps {
  dots: IDot[];
  selected: IDot;
  onClick: Function;
}

function BarChart({
  dots,
  selected,
  onClick,
}: IBarCharttProps): React.ReactElement | null {
  const max = Math.max(...dots.map((dot: IDot) => dot.value));
  const [range, setRange] = useState<number>(max);

  const width = (100 / dots.length) + '%';
  const scale = 100 / range;
  const getHeight = (value: number): number => {
    if (value > range) return 100;
    return value * scale;
  };

  const lines = dots.map((dot: IDot, index: number) => (
    <div
      key={`${dot.title}_${index}`}
      className={style.vertical_bar_item}
      style={{
        width,
        height: `${getHeight(dot.value)}%`,
        backgroundColor: dot.meta === selected ? '#ED675F' : '',
      }}
      title={dot.title}
      onClick={() => {
        if (onClick) onClick(dot);
      }}
    ></div>
  ));

  return (
    <div className={style.vertical_bar}>
      <HorizontalScale
        max={max}
        onChange={setRange}
      />
      <Line
        text={range}
        bottom={100}
      />
      {range >  10 ? (
        <Line
          text={range / 2}
          bottom={50}
        />
      ) : null}
      {lines}
    </div>
  );
}

export default BarChart;
