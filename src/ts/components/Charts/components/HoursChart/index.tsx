import React from 'react';

import { getDayName } from 'ts/helpers/formatter';

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
          className={style.hours_chart_day}
        >
          <div className={style.hours_chart_day_name}>
            {getDayName(day, 'short')}
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
    <div className={style.hours_chart_user}>
      <div className={style.hours_chart_data}>
        <div className={style.hours_chart_day}>
          <Header />
        </div>
        {items}
      </div>
      <Legend />
    </div>
  );
}

export default HoursChart;
