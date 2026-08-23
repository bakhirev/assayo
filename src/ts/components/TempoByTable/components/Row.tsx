import React from 'react';
import { observer } from 'mobx-react-lite';

import applicationConfig from 'ts/store/ApplicationConfig';

import Cell from './Cell';
import style from '../styles/index.module.scss';

interface RowProps {
  columns: string[] | number[];
  refTaskDay: any;
}

const Row = observer(({
  columns,
  refTaskDay,
}: RowProps): React.ReactElement => {
  const cells = columns.map((column: any) => {
    const data = refTaskDay.get(column.id) || '';
    const isWeekend = !applicationConfig.config?.workDays?.[column.day];
    return (
      <Cell
        key={column.id}
        data={data}
        isWeekend={isWeekend}
      />
    );
  });

  return (
    <div className={style.tempo_by_table_row}>
      {cells}
    </div>
  );
});

export default Row;
