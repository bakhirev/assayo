import React from 'react';

import { getDateByTimestamp } from 'ts/helpers/formatter';

import style from '../styles/index.module.scss';

interface HeaderProps {
  columns: string[] | number[];
}

function Header({ columns }: HeaderProps): React.ReactElement {
  const cells = columns.map((column: any) => {
    const [title, dayName] = getDateByTimestamp(column.id);
    return (
      <div
        key={column.id}
        className={style.tempo_by_table_header_cell}
      >
        <div className={style.tempo_by_table_header_cell_value}>
          {title}
          <div className={style.tempo_by_table_header_cell_description}>
            {dayName}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={style.tempo_by_table_header}>
      <div className={style.tempo_by_table_header_empty}></div>
      {cells}
    </div>
  );
}

export default Header;
