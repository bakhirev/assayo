import React, { useEffect, useRef, useState } from 'react';

import MinMaxCounter from 'ts/helpers/DataGrip/components/counter';

import getCommitsByMonth from './helpers/getCommitsByMonth';
import getAuthorByDate from './helpers/getAuthorByDate';
import Month from './components/Month';
import IMonth from './interfaces/Month';

import style from './styles/index.module.scss';

function getDayWidth(wrapperWidth: number, monthNumber: number) {
  const step = 0.3;
  const borders = 7;
  for (let px = 16; px <= 24; px += step) {
    const monthWidth = borders + 8 * px;
    const size = monthWidth * monthNumber;
    if (size > wrapperWidth) return (px - step);
  }
  return 24;
}

interface IYearChartProps {
  maxCommits: number;
  showEvents?: boolean;
  wordDays: any[];
  authors: any[];
}

function YearChart({
  maxCommits = 100,
  showEvents = true,
  wordDays = [],
  authors = [],
}: IYearChartProps): React.ReactElement | null {
  const wrapper = useRef(null);
  const [dayWidth, setDayWidth] = useState<number>(16);

  useEffect(() => {
    if (!wrapper.current) return; // @ts-ignore
    const size = wrapper.current?.getBoundingClientRect() || {};
    const minMonthWidth = 7 + 8 * 16;
    const newMonthNumber = Math.floor(size.width / minMonthWidth);
    const width = getDayWidth(size.width, newMonthNumber);
    setDayWidth(width);
  }, []);

  if (!wordDays || !wordDays.length) return null;

  const authorsByDate = getAuthorByDate(authors);
  const months = getCommitsByMonth(wordDays, authorsByDate);
  const hideMoney = authors?.length === 1;

  const max = {
    tasks: new MinMaxCounter(),
    money: new MinMaxCounter(),
  };

  months.forEach((month: IMonth) => {
    max.tasks.update(month.tasks);
    max.money.update(month.money);
  });

  const elements = months.map((month: IMonth) => (
    <Month
      key={month.id}
      max={{
        tasks: max.tasks.max,
        money: max.money.max,
        commits: maxCommits,
      }}
      month={month}
      showEvents={showEvents}
      hideMoney={hideMoney}
    />
  ));


  const customStyle = { '--day-size': `${dayWidth.toFixed(1)}px` } as React.CSSProperties;

  return (
    <div
      ref={wrapper}
      style={customStyle}
      className={style.year_chart}
    >
      {elements}
    </div>
  );
}

YearChart.defaultProps = {
  showEvents: true,
};

export default YearChart;
