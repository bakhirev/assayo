import React from 'react';
import { useTranslation } from 'react-i18next';

import { IColumn } from '../interfaces/Column';
import getClassName from '../helpers/getClassName';
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
  const { t } = useTranslation();

  let marginLeft = 0;
  const cells = columns.map((column: IColumn, columnIndex: number) => {
    marginLeft += columns[columnIndex - 1]?.width || 0;

    const localClassName = getClassName(style.table_header_cell, column, ['header', columnIndex], className);
    const formattedTitle = t(column.title || '');

    return (
      <div
        key={`${column.title}_${columnIndex}`}
        className={localClassName}
        style={{ width: column.width, left: marginLeft }}
      >
        <span
          title={formattedTitle}
          onClick={() => {
            if (!column.isSortable || !updateSort) return;
            updateSort([{
              property: typeof column.isSortable === 'string' ? column.isSortable : column.properties,
              direction: [1, -1][column.sortDirection || 0] || 0,
            }]);
          }}
        >
          {formattedTitle}
        </span>
        {column.title && column.sortDirection === -1 && (
          <div className={headerStyle.table_sort_down} />
        )}
        {column.title && column.sortDirection === 1 && (
          <div className={headerStyle.table_sort_up} />
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
