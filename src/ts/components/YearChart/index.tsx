import React, { useEffect, useRef, useState } from 'react';

import { DataGripMonth } from 'ts/helpers/DataGrip/components/month';

import { Filters } from './interfaces/Filters';
import DayInfoHint from './components/DayInfo';
import Month from './components/Month';
import type { DayEvents } from './helpers/events';
import { getDayWidth } from './helpers/day';
import dayInfoStore from './store/DayInfo';

import style from './styles/index.module.scss';

interface IYearChartProps {
  max?: number;
  events: DayEvents;
  months: DataGripMonth[];
  filters?: Filters;
}

function YearChart({
  max = 100,
  events,
  months = [],
  filters = {},
}: IYearChartProps): React.ReactElement | null {
  const wrapper = useRef(null);
  const [dayWidth, setDayWidth] = useState<number>(16);

  useEffect(() => {
    if (!wrapper.current) return; // @ts-ignore
    const size = wrapper.current?.getBoundingClientRect() || {};
    const width = getDayWidth(size?.width);
    setDayWidth(width);
    return () => dayInfoStore.close();
  }, []);

  if (!months?.length) return null;

  const elements = months.map((month: DataGripMonth, index: number) => {
    const prev = months[index - 1];
    return (
      <Month
        key={month.id}
        max={max}
        events={events}
        filters={filters}
        showYear={prev?.year !== month?.year}
        month={month}
      />
    );
  });

  const daySize = dayWidth.toFixed(1);
  const customStyle = { '--day-size': `${daySize}px` } as React.CSSProperties;

  return (
    <div
      ref={wrapper}
      style={customStyle}
      className={style.year_chart}
    >
      {elements}
      <DayInfoHint events={events} />
    </div>
  );
}

export default YearChart;
