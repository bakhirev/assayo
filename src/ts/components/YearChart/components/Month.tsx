import React from 'react';

import { getShortMoney } from 'ts/helpers/formatter';
import cssDescription from 'ts/components/Description/index.module.scss';

import IMonth from '../interfaces/Month';
import Header from './Header';
import Body from './Body';
import style from '../styles/index.module.scss';

interface IMonthProps {
  month: IMonth;
  maxCommits: number;
}

function Month({
  month,
  maxCommits,
}: IMonthProps): React.ReactElement | null {
  return (
    <div className={`${style.year_chart_month}`}>
      <Header month={month} />
      <Body
        month={month}
        maxCommits={maxCommits}
      />
      <p className={cssDescription.description_text}>
        <span title="Задач за месяц">
          {`☑ ${month.tasks}`}
        </span>
        <span title="Затраты на зарплату сотрудникам">
          {` за ${getShortMoney(month.money || 0, 0)}`}
        </span>
      </p>
    </div>
  );
}

Month.defaultProps = {
  rows: [],
};

export default Month;
