import React from 'react';

import { IColumn } from 'ts/components/Table/interfaces/Column';
import localization from 'ts/helpers/Localization';

import style from '../styles/index.module.scss';

interface ILineProps {
  column: IColumn,
  item: any,
  value?: string | number | boolean | null;
  className?: string | Function,
}

function Line({
  column,
  item,
  value,
  className,
}: ILineProps): JSX.Element {
  const columnClassName = typeof column.className === 'function'
    ? column.className('body', item)
    : column.className;

  return (
    <div
      key={column.title}
      className={`${style.card_line} ${className || ''} ${columnClassName || ''}`}
    >
      <div className={style.card_line_title}>
        {localization.get(column.title)}
      </div>
      <div className={style.card_line_value}>
        {value}
      </div>
    </div>
  );
}

Line.defaultPeops = {
  className: '',
};

export default Line;
