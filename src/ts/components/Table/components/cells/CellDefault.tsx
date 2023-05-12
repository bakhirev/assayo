import React, { ReactNode } from 'react';

import { IColumn } from '../../interfaces/Column';
import style from '../../styles/index.module.scss';

interface IDefaultCellProps {
  column: IColumn,
  row: any,
  className?: string,
  children?: ReactNode | string | number | boolean | null;
}

function DefaultCell({
  column,
  row,
  className,
  children,
}: IDefaultCellProps): JSX.Element {
  const columnClassName = typeof column.className === 'function'
    ? column.className('body', row)
    : column.className;
  const onClick = column.onClick
    ? (() => { if (column.onClick) column.onClick(row); })
    : undefined;

  return (
    <div
      key={column.title}
      className={`${style.table_cell} ${className || ''} ${columnClassName || ''}`}
      style={{
        width: column.width,
        cursor: onClick ? 'pointer' : 'auto',
      }} // @ts-ignore
      onClick={onClick}
    >
      {children}
    </div>
  );
}

DefaultCell.defaultPeops = {
  className: '',
};

export default DefaultCell;
