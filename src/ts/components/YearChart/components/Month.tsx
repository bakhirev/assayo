import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import { getShortMoney } from 'ts/helpers/formatter';

import IMonth from '../interfaces/Month';
import Header from './Header';
import Body from './Body';

import styleChart from '../styles/line.module.scss';
import style from '../styles/index.module.scss';

interface IMonthTotalProps {
  title: string;
  options: any;
  value: any;
}

function MonthTotal({
  title,
  options,
  value,
}: IMonthTotalProps) {
  return (
    <div className={styleChart.year_chart_month_info}>
      <span className={styleChart.year_chart_month_text}>
        {title}
      </span>
      <LineChart
        options={options}
        value={value}
        className={styleChart.year_chart_month_chart}
      />
    </div>
  );
}

interface IMonthProps {
  max: IHashMap<number>;
  month: IMonth;
  showEvents: boolean;
}

function Month({
  max,
  month,
  showEvents,
}: IMonthProps): React.ReactElement | null {
  const tasksChart = getOptions({ max: max.tasks, suffix: 'задач' });
  const moneyChart = getOptions({
    max: max.money,
    suffix: '',
    formatter: getShortMoney,
  });

  console.dir(month);
  return (
    <div className={style.year_chart_month}>
      <Header month={month}/>
      <Body
        month={month}
        maxCommits={max.commits}
        showEvents={showEvents}
      />
      <MonthTotal
        title="$"
        options={moneyChart}
        value={month.money}
      />
      <MonthTotal
        title="☑"
        options={tasksChart}
        value={month.tasks}
      />
    </div>
  );
}

export default Month;
