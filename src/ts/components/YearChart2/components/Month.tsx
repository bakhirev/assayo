import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import { getShortMoney } from 'ts/helpers/formatter';

import IMonth from '../interfaces/Month';
import Header from './Header';
import Body from './Body';

import styleChart from '../styles/line.module.scss';
import style from '../styles/index.module.scss';

interface IMonthProps {
  max: IHashMap<number>;
  month: IMonth;
  showEvents: boolean;
  hideMoney?: boolean;
}

function Month({
  max,
  month,
  showEvents,
  hideMoney,
}: IMonthProps): React.ReactElement | null {
  let value = '';
  if (month.tasks) {
    value = `☑ ${month.tasks || 0}`;
  }
  if (!hideMoney && month.money) {
    value = `☑ ${month.tasks || 0} — ${getShortMoney(month.money || 0, 0)}`;
  }

  const title = hideMoney
    ? 'tasks'
    : 'tasks and money';

  return (
    <div className={style.year_chart_month}>
      <Header month={month}/>
      <Body
        month={month}
        maxCommits={max.commits}
        showEvents={showEvents}
      />
      <div
        title={title}
        className={styleChart.year_chart_month_info}
      >
        {value}
      </div>
    </div>
  );
}

Month.defaultProps = {
  hideMoney: false,
};

export default Month;
