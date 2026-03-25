import React from 'react';

import Line from './components/Line';

import style from './styles/index.module.scss';

interface IDot {
  title: string;
  value: number;
  color?: string;
  meta?: any;
}

interface BarChartWithFewValuesProps {
  dots: IDot[];
  selected: IDot;
  onClick: Function;
}

export default function BarChartWithFewValues({
  dots,
  selected,
  onClick,
}: BarChartWithFewValuesProps): React.ReactElement | null {
  const max = Math.ceil(Math.max(...dots.map((dot: IDot) => dot.value)));

  const width = (100 / dots.length) + '%';
  const scale = 100 / max;
  const getHeight = (value: number): number => {
    return value * scale;
  };

  const lines = dots.map((dot: IDot, index: number) => (
    <div
      key={`${dot.title}_${index}`}
      className={style.vertical_bar_few_item}
      style={{
        width,
        height: `${getHeight(dot.value)}%`,
      }}
    >
      <div className={style.vertical_bar_few_item_value}>
        {dot.value}
      </div>
      <div
        className={style.vertical_bar_few_item_column}
        title={dot.title}
        style={{
          backgroundColor: dot.meta === selected ? '#ED675F' : '',
        }}
        onClick={() => {
          if (onClick) onClick(dot);
        }}
      ></div>
    </div>
  ));

  return (
    <div className={style.vertical_bar_few}>
      <Line
        text={max}
        bottom={100}
      />
      <Line
        text={max / 2}
        bottom={50}
      />
      {lines}
    </div>
  );
}
