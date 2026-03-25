import React from 'react';
import { observer } from 'mobx-react-lite';

import { getDayName } from 'ts/helpers/formatter';
import applicationConfig from 'ts/store/ApplicationConfig';

import Header from './components/Header';
import Columns from './components/Columns';
import Legend from './components/Legend';

import style from './index.module.scss';

interface HoursChartProps {
  max: number;
  commitsByDayAndHour: number[][];
}

const HoursChart = observer(({
  max,
  commitsByDayAndHour,
}: HoursChartProps): React.ReactElement | null => {
  const items = commitsByDayAndHour.map((week: number[], day: number) => {
    const isWeekend = !applicationConfig.config?.workDays?.[day];
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
          isWeekend={isWeekend}
          max={max}
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
});

export default HoursChart;
