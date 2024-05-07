import React from 'react';

import { IColumn, IRowsConfig } from '../../interfaces/Column';
import style from '../../styles/index.module.scss';

interface IDefaultCellProps {
  column: IColumn,
  row: any,
  className?: string,
  rowConfig?: IRowsConfig;
  updateRowsConfig?: (config: IRowsConfig) => void;
}

function DetailsCell({
  column,
  row,
  className,
  rowConfig,
  updateRowsConfig,
}: IDefaultCellProps): JSX.Element {
  const config = rowConfig || { id: 1 };

  const columnClassName = typeof column.className === 'function'
    ? column.className('body', row)
    : column.className;

  const iconClassName = config?.details
    ? style.table_cell_icon_open
    : style.table_cell_icon_close;

  const hasIcon = ((column.properties && row[column.properties])
    || !column.properties
    || !column.properties?.length)
    && column.formatter;

  const onClick = () => {
    if (!hasIcon || !updateRowsConfig) return;
    updateRowsConfig({
      ...config,
      details: !config?.details,
    });
  };

  return (
    <div
      key={column.title} // @ts-ignore
      className={`${style.table_cell} ${className || ''} ${columnClassName || ''}`}
      style={{
        width: column.width,
        cursor: 'pointer',
      }} // @ts-ignore
      onClick={onClick}
    >
      {hasIcon && (
        <img
          className={iconClassName}
          src="./assets/menu/arrow_right.svg"
        />
      )}
    </div>
  );
}

DetailsCell.defaultPeops = {
  className: '',
};

export default DetailsCell;
