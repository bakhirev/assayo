import React from 'react';

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
  const width = (100 / dots.length) + '%';
  const scale = 100 / Math.max(...dots.map((dot: IDot) => dot.value));
  const getHeight = (value: number): number => value * scale;

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
      {lines}
    </div>
  );
}

export default BarChart;
