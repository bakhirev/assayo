import React from 'react';

import { IColumn } from '../../interfaces/Column';
import style from '../../styles/index.module.scss';

interface IDefaultCellProps {
  column: IColumn,
  row: any,
  className?: string,
}

function DefaultCell({
  column,
  row,
  className,
}: IDefaultCellProps): JSX.Element {
  const columnClassName = typeof column.className === 'function'
    ? column.className('body', row)
    : column.className;

  const onClick = column.onClick
    ? (() => { if (column.onClick) column.onClick(row); })
    : undefined;

  const value = column.properties
    ? row[column.properties]
    : row;

  const formattedValue = column.formatter
    ? column.formatter(value)
    : value;

  const content: any = typeof column.template === 'function'
    ? column.template(formattedValue, row)
    : `${column.prefixes ?? ''}${formattedValue ?? ''}${column.suffixes ?? ''}`;

  const cellTitle = typeof content === 'string' && content.length > 20
    ? content
    : null;

  return (
    <div
      key={column.title} // @ts-ignore
      title={cellTitle}
      className={`${style.table_cell} ${className || ''} ${columnClassName || ''}`}
      style={{
        width: column.width,
        cursor: onClick ? 'pointer' : 'auto',
      }} // @ts-ignore
      onClick={onClick}
    >
      {content}
    </div>
  );
}

DefaultCell.defaultPeops = {
  className: '',
};

export default DefaultCell;
