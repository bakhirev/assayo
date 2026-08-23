import React from 'react';

import style from '../styles/index.module.scss';
import { getShortNumber } from 'ts/helpers/formatter';

interface CellProps {
  data: any;
  isWeekend?: boolean;
}

function Cell({ data, isWeekend }: CellProps): React.ReactElement {
  const className = isWeekend
    ? `${style.tempo_by_table_cell} ${style.tempo_by_table_cell_weekend}`
    : style.tempo_by_table_cell;

  return (
    <div className={className}>
      {data ? `${getShortNumber(data)}h` : null}
    </div>
  );
}

export default Cell;
