import React, { useEffect, useRef, useState } from 'react';

import { StatisticsMonth } from 'ts/helpers/StatisticsByCommits/components/month';

import { Filters } from './interfaces/Filters';
import DayInfoHint from './components/DayInfo';
import Month from './components/Month';
import type { DayEvents } from './helpers/events';
import { getDayWidth } from './helpers/day';
import dayInfoStore from './store/DayInfo';

import style from './styles/index.module.scss';

function getFormattedMonths(months: StatisticsMonth[], author: string) {
  const filter = (month: StatisticsMonth) => month.authors.has(author);
  const from = months.findIndex(filter); // @ts-ignore
  const to = months.findLastIndex(filter);
  return months.slice(from, to);
}

interface IYearChartProps {
  max?: number;
  author?: string;
  events: DayEvents;
  months: StatisticsMonth[];
  filters?: Filters;
}

function YearChart({
  max = 100,
  author,
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

  const formattedMonths = author
    ? getFormattedMonths(months, author)
    : months;

  if (!months?.length) return null;

  const elements = formattedMonths.map((month: StatisticsMonth, index: number) => {
    const prev = formattedMonths[index - 1];
    return (
      <Month
        key={month.id}
        max={max}
        author={author}
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
      <DayInfoHint
        author={author}
        events={events}
      />
    </div>
  );
}

export default YearChart;
