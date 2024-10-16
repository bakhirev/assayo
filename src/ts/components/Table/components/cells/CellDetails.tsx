import React from 'react';

import { IColumn, IRowsConfig } from '../../interfaces/Column';
import getClassName from '../../helpers/getClassName';
import style from '../../styles/index.module.scss';

interface IDefaultCellProps {
  column: IColumn,
  row: any,
  className?: string,
  rowConfig?: IRowsConfig;
  marginLeft?: number;
  updateRowsConfig?: (config: IRowsConfig) => void;
}

function DetailsCell({
  column,
  row,
  className,
  rowConfig,
  marginLeft,
  updateRowsConfig,
}: IDefaultCellProps): JSX.Element {
  const config = rowConfig || { id: 1 };

  const left = column?.isFixed ? marginLeft : 0;

  const iconClassName = config?.details
    ? style.table_cell_icon_open
    : style.table_cell_icon_close;

  const localClassName = getClassName(style.table_cell, column, ['body', row], className);

  const value = row?.[column?.properties || ''];
  const notNull = (Array.isArray(value) || value instanceof Set) // @ts-ignore
    ? (value?.length || value?.size)
    : !!value;
  const hasIcon = notNull || !column?.properties;

  const onClick = () => {
    if (!hasIcon || !updateRowsConfig) return;
    updateRowsConfig({
      ...config,
      details: !config?.details,
    });
  };

  return (
    <div
      key={column.title}
      className={localClassName}
      style={{
        left,
        width: column.width,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {hasIcon && (
        <img
          className={iconClassName}
          src="./assets/list/arrow.svg"
        />
      )}
    </div>
  );
}

DetailsCell.defaultPeops = {
  className: '',
};

export default DetailsCell;
