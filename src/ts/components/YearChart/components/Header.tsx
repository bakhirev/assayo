import React from 'react';

import IMonth from '../interfaces/Month';
import style from '../styles/index.module.scss';

interface IHeaderProps {
  month: IMonth;
}

function Header({
  month,
}: IHeaderProps): React.ReactElement | null {
  const name = month.date.toLocaleString('ru-RU', { month: 'long' });
  const showYear = month.first || month.last || !month.month;

  return (
    <div className={style.year_chart_month_header}>
      <span
        className={style.year_chart_month_header_title}
        style={{ fontWeight: showYear ? 'bold' : 100 }}
      >
        {name} {showYear ? month.year : ''}
      </span>
    </div>
  );
}

export default Header;
