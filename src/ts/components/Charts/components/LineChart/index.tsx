import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';

import { getSubLines } from '../../helpers';
import Line from './components/Line';

import ColorGenerator from '../../helpers/ColorGenerator';
import style from './styles/index.module.scss';

interface LineChartProps {
  value?: number;
  details?: IHashMap<number>;
  max?: number;
  order?: string[];
  formatter?: (value: any) => string | number;
  limit?: number;
  suffix?: string;
  className?: string;
  options?: any;
}

function LineChart({
  value,
  details,
  max,
  suffix,
  order,
  limit,
  formatter,
  className,
}: LineChartProps): React.ReactElement | null {
  if (value === 0 || (!value && !details)) return null;

  const formattedMax = max || 100;
  const formattedLimit = limit || (formattedMax * 0.2);
  const color = order?.length ? (new ColorGenerator(order)) : undefined;

  let width = Math.round((value || 100) * (100 / formattedMax));
  if (width < 1) return null;
  if (width > 100) width = 100;

  if (!details) {
    return (
      <div className={`${style.line_chart} ${className || ''}`}>
        <Line
          value={value}
          width={width}
          suffix={suffix}
          formatter={formatter}
          className={style.line_chart_item}
        />
      </div>
    );
  }

  // TODO: max если не передан с наружи, то нужно посчитать внутри, т.к. limit не верный
  // if (!max && !limit) {
  //   console.log(Object.values(details).reduce((acc, v) => acc + v, 0) * 0.05);
  // }
  const subLines = getSubLines(details, order, formattedLimit)
    .map((item) => (
      <Line
        key={item.title}
        title={item.title}
        value={item.value}
        width={item.width}
        color={color?.get(item.title)}
        suffix={suffix}
        formatter={formatter}
        description={item.description}
        className={style.line_chart_sub_item}
      />
    ));

  return (
    <div className={`${style.line_chart} ${className || ''}`}>
      <div
        className={style.line_chart_item}
        style={{ width: `${width}%` }}
      >
        {subLines}
      </div>
    </div>
  );
}

LineChart.defaultProps = {
  max: undefined,
  suffix: 'commits',
  value: undefined,
  formatter: undefined,
  details: undefined,
  className: '',
};

export default LineChart;
