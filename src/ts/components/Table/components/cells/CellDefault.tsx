import React from 'react';

import { IColumn } from '../../interfaces/Column';
import getClassName from '../../helpers/getClassName';
import style from '../../styles/index.module.scss';

interface IDefaultCellProps {
  column: IColumn,
  row: any,
  rowIndex?: number,
  marginLeft?: number,
  className?: string,
}

function DefaultCell({
  column,
  row,
  rowIndex,
  marginLeft,
  className,
}: IDefaultCellProps): JSX.Element {
  const localClassName = getClassName(style.table_cell, column, ['body', row], className);

  const left = column.isFixed ? marginLeft : 0;

  const onClick = column.onClick
    ? (() => { if (column.onClick) column.onClick(row); })
    : undefined;

  const value = column.properties
    ? row[column.properties]
    : row;

  const formattedValue = column.formatter
    ? column.formatter(value, rowIndex)
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
      className={localClassName}
      style={{
        left,
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
