import React from 'react';

import { StatisticsMonth } from 'ts/helpers/StatisticsByCommits/components/month';
import { If } from 'ts/components/Layout';

import { Filters } from '../interfaces/Filters';
import Header from './Header';
import Body from './Body';
import { DayEvents } from '../helpers/events';

import styleChart from '../styles/line.module.scss';
import style from '../styles/index.module.scss';

interface MonthProps {
  max: number;
  author?: string;
  showYear: boolean;
  events: DayEvents;
  filters: Filters;
  month: StatisticsMonth;
}

function Month({
  max,
  author,
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
        author={author}
        month={month}
        events={events}
        filters={filters}
      />

      <If value={!author}>
        <div className={styleChart.year_chart_month_info}>
          <img
            alt=""
            className={style.year_chart_month_icon}
            src="./assets/chart/tasks.svg"
          />
          <span>
            {month.totalTasksNumber || 0}
          </span>
          <img
            alt=""
            className={style.year_chart_month_icon}
            src="./assets/chart/person.svg"
          />
          <span>
            {month.totalUsersNumber || 0}
          </span>
        </div>
      </If>
    </div>
  );
}

export default Month;
