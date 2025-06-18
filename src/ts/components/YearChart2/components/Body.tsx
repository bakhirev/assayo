import React from 'react';

import dataGripStore from 'ts/store/DataGrip';

import Day from './Day';
import IMonth from '../interfaces/Month';
import style from '../styles/index.module.scss';
import { getEvents } from '../helpers/day';

interface IBodyProps {
  month: IMonth;
  maxCommits: number;
  showEvents: boolean;
}

function Body({
  month,
  maxCommits,
  showEvents,
}: IBodyProps): React.ReactElement | null {
  const firstDay = month.date.getDay() - 1;
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const lastDay = firstDay + daysInMonth[month.month];
  const allDays = (new Array(6 * 7)).fill(0);
  let currentDay = 0;

  const events = showEvents ? getEvents(dataGripStore) : {};
  const days = allDays.map((v: any, index: number) => {
    const dayInfo = month.commits[currentDay];

    if (dayInfo?.dayInMonth === (index - firstDay + 1)) {
      currentDay += 1;
      return (
        <Day
          key={index}
          month={month}
          maxCommits={maxCommits}
          dayNumber={index}
          dayInfo={dayInfo}
          events={events}
       />
      );
    }

    return (
      <div
        key={index}
        className={style.year_chart_month_body_day}
        style={{
          opacity: (index < firstDay || index > lastDay) ? 0.3 : 1,
        }}
      />
    );
  });

  return (
    <div className={style.year_chart_month_body}>
      {days}
    </div>
  );
}

Body.defaultProps = {
  rows: [],
};

export default Body;
