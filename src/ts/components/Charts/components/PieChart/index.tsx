import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import { Title } from 'ts/components/Layout';
import { useTranslation } from 'ts/components/Translation';

import { IOptions } from '../../interfaces';
import { getSubLines, ColorGenerator } from '../../helpers';
import PieSVG from '../PieSVG';

import Legend from './components/Legend';
import style from './index.module.scss';

interface IPieChartProps {
  title?: string;
  description?: string;
  options?: IOptions;
  value?: number;
  details: IHashMap<number>;
  max?: number;
  order?: string[];
  limit?: number;
  suffix?: string;
  other?: string;
  center?: number;
  className?: string;
}

function PieChart({
  title,
  description,
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
  if (!details) return null;

  const { t } = useTranslation();
  const formattedMax = max || 100;
  const formattedOrder = order || Object.keys(details);
  const defaultLimit = formattedOrder?.length > 7
    ? formattedMax * 0.2
    : 1;
  const formattedLimit = limit || defaultLimit;
  const parts = getSubLines(details, formattedOrder, formattedLimit, other);
  const alignItems = parts.length > 6 ? 'flex-start' : 'center';
  const color = new ColorGenerator(formattedOrder);

  if (!parts.length) return null;

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
          {value ? (
            <div className={style.pie_chart_value}>
              {value}
            </div>
          ) : null}
          {value && suffix ? (
            <div className={style.pie_chart_description}>
              {t(description) || t(suffix)}
            </div>
          ) : null}
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
