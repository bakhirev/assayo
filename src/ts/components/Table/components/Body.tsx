import React from 'react';

import { IColumn } from '../interfaces/Column';
import style from '../styles/index.module.scss';
import DefaultCell from './cells/CellDefault';

interface IBodyProps {
  rows: any[];
  columns: IColumn[];
  disabledRow?: (row: any) => boolean;
  className?: string;
}

function Body({
  rows,
  disabledRow,
  columns,
  className,
}: IBodyProps) {
  const formattedRows = rows?.map((row: any, index: number) => {
    const cells = columns.map((column: IColumn, columnIndex: number) => {
      const value = column.properties
        ? row[column.properties]
        : row;
      const formattedValue = column.formatter
        ? column.formatter(value)
        : value;
      const content: any = typeof column.template === 'function'
        ? column.template(formattedValue, row)
        : `${column.prefixes ?? ''}${formattedValue ?? ''}${column.suffixes ?? ''}`;

      return (
        <DefaultCell
          key={`${column.title}_${columnIndex}`}
          column={column}
          row={row}
        >
          {content}
        </DefaultCell>
      );
    });

    const rowClassName = disabledRow && disabledRow(row)
      ? style.disabled
      : '';

    return (
      <div
        key={index}
        className={`${style.table_row} ${rowClassName} ${className}`}
      >
        {cells}
      </div>
    );
  });

  return (
    <>
      {formattedRows}
    </>
  );
}

Body.defaultProps = {
  className: '',
};

export default Body;
