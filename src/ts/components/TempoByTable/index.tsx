import React from 'react';

import Header from './components/Header';
import Row from './components/Row';
import FirstColumn from './components/FirstColumn';
import { getColumnsAndRows } from './helpers';

import style from './styles/index.module.scss';

interface TempoByTableProps {
  days: any[];
  author?: string;
  mode?: string;
}

function TempoByTable({
  days,
  author,
  mode,
}: TempoByTableProps) {
  const [columns, rows] = getColumnsAndRows(days, author);

  const list = Array.from(rows) as [string, any];
  const rowsElements = list.map(([task, refTaskDay]) => (
    <Row
      key={task}
      columns={columns}
      refTaskDay={refTaskDay}
    />
  ));

  const className = mode === 'print'
    ? `${style.tempo_by_table} scroll_x`
    : `${style.tempo_by_table} scroll_x scroll_y`;

  return (
    <div className={className}>
      <Header columns={columns} />
      <FirstColumn tasks={list} />
      <div className={style.tempo_by_table_body}>
        {rowsElements}
      </div>
    </div>
  );
}

export default TempoByTable;
