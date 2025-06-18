import React from 'react';
import { useTranslation } from 'react-i18next';

import { DataGripMonth } from 'ts/helpers/DataGrip/components/month';

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
  month: DataGripMonth;
}

function Month({
  max,
  showYear,
  events,
  filters,
  month,
}: MonthProps): React.ReactElement | null {
  const { t } = useTranslation();
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
          title={t('page.team.week.tasks')}
          className={style.year_chart_month_icon}
          src="./assets/chart/tasks.svg"
        />
        <span title={t('page.team.week.tasks')}>
          {month.tasksNumber || 0}
        </span>
        <img
          title={t('page.team.country.chart.item')}
          className={style.year_chart_month_icon}
          src="./assets/chart/person.svg"
        />
        <span title={t('page.team.country.chart.item')}>
          {month.usersNumber || 0}
        </span>
      </div>
    </div>
  );
}

export default Month;
