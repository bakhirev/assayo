import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import { Title } from 'ts/components/Layout';

import { IOptions } from '../../interfaces';
import { getSubLines, ColorGenerator } from '../../helpers';
import PieSVG from '../PieSVG';

import Legend from './components/Legend';
import style from './index.module.scss';

interface IPieChartProps {
  title?: string;
  options?: IOptions;
  value?: number;
  details?: IHashMap<number>;
  max?: number;
  order?: string[];
  limit?: number;
  suffix?: string;
  other?: string;
  center?: number;
  className?: string;
}

function getDefaultDetails(value: number, max: number) {
  return {
    a: value,
    b: max - value,
  };
}

function PieChart({
  title,
  value,
  details,
  max,
  suffix,
  other,
  order,
  limit,
  center,
  className,
}: IPieChartProps): React.ReactElement | null {
  if (value === 0) return null;

  const formattedMax = max || 100;
  const formattedLimit = limit || (formattedMax * 0.1);
  const formattedDetails = details || getDefaultDetails(value || 100, formattedMax);
  const parts = getSubLines(formattedDetails, order, formattedLimit, other);
  const alignItems = parts.length > 6 ? 'flex-start' : 'center';
  const color = new ColorGenerator(order);

  return (
    <div className={`${style.pie_chart} ${className || ''}`}>
      <Title title={title || ''} />
      <div
        className={style.pie_chart_data}
        style={{ alignItems }}
      >
        <div className={style.pie_chart_icon}>
          <PieSVG
            parts={parts}
            color={color}
            suffix={suffix}
            center={center}
          />
        </div>
        <Legend
          parts={parts}
          color={color}
        />
      </div>
    </div>
  );
}

PieChart.defaultProps = {
  value: undefined,
  details: undefined,
  className: '',
  title: '',
};

export default PieChart;
