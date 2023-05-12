import React from 'react';

import { getDayPrefix } from 'ts/helpers/formatter';

import Header from './components/Header';
import Columns from './components/Columns';
import Legend from './components/Legend';

import style from './index.module.scss';

interface IHoursChartProps {
  statistic: any;
}

function HoursChart({
  statistic,
}: IHoursChartProps): React.ReactElement | null {

  const items = statistic.commitsByDayAndHour
    .map((week: number[], day: number) => {
      return (
        <div
          key={day}
          className={style.day}
        >
          <div className={style.day_name}>
            {getDayPrefix(day)}
          </div>
          <Columns
            week={week}
            day={day}
            max={statistic.commitsByDayAndHourTotal[8]}
          />
        </div>
      );
    });

  return (
    <div className={style.user}>
      <div className={style.data}>
        <div className={style.day}>
          <Header />
        </div>
        {items}
      </div>
      <Legend />
    </div>
  );
}

export default HoursChart;
