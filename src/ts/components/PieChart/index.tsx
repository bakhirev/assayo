import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import { IOptions } from 'ts/components/LineChart/interfaces';
import getSubLines from 'ts/components/LineChart/helpers/getSubLines';
import PieSVG from 'ts/components/PieSVG';
import Title from 'ts/components/Title';

import Legend from './components/Legend';
import style from './index.module.scss';

interface IPieChartProps {
  title?: string;
  options: IOptions;
  value?: number;
  details?: IHashMap<number>;
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
  options,
  value,
  details,
  center,
  className,
}: IPieChartProps): React.ReactElement | null {
  if (value === 0) return null;

  const formattedDetails = details || getDefaultDetails(value || 100, options.max || 100);
  const parts = getSubLines(formattedDetails, options);
  const alignItems = parts.length > 6 ? 'flex-start' : 'center';

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
            options={options}
            center={center}
          />
        </div>
        <Legend
          parts={parts}
          options={options}
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
