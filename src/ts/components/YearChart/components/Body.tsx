import React from 'react';

import IMonth from '../interfaces/Month';
import style from '../styles/index.module.scss';

function getPercentByMax(countCommit: number, max: number) {
  const value = ((countCommit || 0) * 100) / max;
  return (value - value % 1) / 100;
}

function getIconUrl(month: IMonth, dayInMonth: number) {
  const addPerson = month.firstDay?.[dayInMonth];
  const removePerson = month.lastDay?.[dayInMonth];
  if (addPerson && removePerson) return './assets/chart/commit.svg';
  if (removePerson) return './assets/chart/commit.svg';
  if (addPerson) return './assets/chart/commit.svg';
  return '';
}

function getColor(isWeekend: boolean, opacity: number): string {
  const colors = isWeekend ? [
    '#ED675F', // 1
    '#EB817C', // 0.8
    '#E98E8A', // 0.7
    '#E89B99', // 0.6
    '#E7A8A7', // 0.5
    '#E7B5B6', // 0.4
    '#E6C3C4', // 0.3
    '#E4CFD3', // 0.2
  ] : [
    '#4162B5', // 0 1
    '#617DC1', // 1 0.8
    '#718AC6', // 2 0.7
    '#8198CD', // 3 0.6
    '#91A6D2', // 4 0.5
    '#A2B3D8', // 5 0.4
    '#B2C1DE', // 6 0.3
    '#C2CEE4', // 7 0.2
  ];
  if (opacity >= 0.8) return colors[1];
  if (opacity >= 0.6) return colors[3];
  if (opacity >= 0.4) return colors[5];
  return colors[7];
}

interface IBodyProps {
  month: IMonth;
  maxCommits: number;
}

function Body({
  month,
  maxCommits,
}: IBodyProps): React.ReactElement | null {
  const firstDay = month.date.getDay() - 1;
  const weekend = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const lastDay = firstDay + daysInMonth[month.month];
  const allDays = (new Array(6 * 7)).fill(0);
  let currentDay = 0;
  const days = allDays.map((v: any, index: number) => {
    const dayInfo = month.commits[currentDay];

    if (dayInfo?.dayInMonth === (index - firstDay + 1)) {
      currentDay += 1;
      const opacity = getPercentByMax(dayInfo.commits, maxCommits);
      const isWeekend = weekend.includes(index);
      const backgroundColor = getColor(isWeekend, opacity);
      const iconUrl = getIconUrl(month, dayInfo.dayInMonth);

      return (
        <div
          key={index}
          className={style.year_chart_month_body_day}
          style={{
            backgroundColor,
            backgroundImage: iconUrl ? `url(${iconUrl})` : '',
          }}
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
