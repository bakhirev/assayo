import React from 'react';

import localization from 'ts/helpers/Localization';

import { IColumn } from '../interfaces/Column';
import headerStyle from '../styles/header.module.scss';
import style from '../styles/index.module.scss';

interface ITitleProps {
  columns: IColumn[];
  className?: string;
  updateSort?: Function;
}

function Header({
  columns,
  className,
  updateSort,
}: ITitleProps) {
  const cells = columns.map((column: IColumn, columnIndex: number) => {
    const columnClassName = typeof column.className === 'function'
      ? column.className('header', columnIndex)
      : column.className;

    return (
      <div
        key={`${column.title}_${columnIndex}`}
        className={`${style.table_header_cell} ${className} ${columnClassName || ''}`}
        style={{ width: column.width }}
      >
        <span
          onClick={() => {
            if (!column.isSortable || !updateSort) return;
            updateSort([{
              property: typeof column.isSortable === 'string' ? column.isSortable : column.properties,
              direction: [1, -1][column.sortDirection || 0] || 0,
            }]);
          }}
        >
          {localization.get(column.title)}
        </span>
        {column.title && column.sortDirection === -1 && (
          <div className={headerStyle.sort_down} />
        )}
        {column.title && column.sortDirection === 1 && (
          <div className={headerStyle.sort_up} />
        )}
      </div>
    );
  });

  return (
    <div className={`${style.table_row} ${className}`}>
      {cells}
    </div>
  );
}

Header.defaultProps = {
  className: '',
  updateSort: () => {},
};

export default Header;
