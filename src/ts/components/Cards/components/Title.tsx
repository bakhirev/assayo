import React from 'react';

import { IColumn } from 'ts/components/Table/interfaces/Column';

import style from '../styles/index.module.scss';

interface ILineProps {
  column: IColumn,
  item: any,
  className?: string | Function,
  value?: string | number | boolean | null;
}

function LineTitle({
  column,
  item,
  className,
  value,
}: ILineProps): JSX.Element {
  const columnClassName = typeof column.className === 'function'
    ? column.className('body', item)
    : column.className;

  return (
    <div
      key={column.title}
      className={`${style.card_title} ${className || ''} ${columnClassName || ''}`}
    >
      {value || '—'}
    </div>
  );
}

LineTitle.defaultPeops = {
  className: '',
};

export default LineTitle;
