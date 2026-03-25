import React from 'react';

import { StatisticsMonth } from 'ts/helpers/StatisticsByCommits/components/month';

import { Filters } from '../interfaces/Filters';
import Header from './Header';
import Body from './Body';
import { DayEvents } from '../helpers/events';

import styleChart from '../styles/line.module.scss';
import style from '../styles/index.module.scss';

interface MonthProps {
  max: number;
  showYear: boolean;
  events: DayEvents;
  filters: Filters;
  month: StatisticsMonth;
}

function Month({
  max,
  showYear,
  events,
  filters,
  month,
}: MonthProps): React.ReactElement | null {
  return (
    <div className={style.year_chart_month}>
      <Header
        month={month}
        showYear={showYear}
      />
      <Body
        max={max}
        month={month}
        events={events}
        filters={filters}
      />
      <div className={styleChart.year_chart_month_info}>
        <img
          className={style.year_chart_month_icon}
          src="./assets/chart/tasks.svg"
        />
        <span>
          {month.tasksNumber || 0}
        </span>
        <img
          className={style.year_chart_month_icon}
          src="./assets/chart/person.svg"
        />
        <span>
          {month.usersNumber || 0}
        </span>
      </div>
    </div>
  );
}

export default Month;
