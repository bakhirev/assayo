import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';

import { ColumnTypesEnum, IColumn, IRowsConfig } from '../interfaces/Column';
import DefaultCell from './cells/CellDefault';
import DetailsCell from './cells/CellDetails';

import style from '../styles/index.module.scss';
import { getRowId } from '../helpers/getRowsConfig';

interface IBodyProps {
  rows: any[];
  columns: IColumn[];
  disabledRow?: (row: any) => boolean;
  className?: string;
  rowsConfig?: IHashMap<IRowsConfig>;
  updateRowsConfig?: (config: IRowsConfig) => void;
}

function Body({
  rows,
  disabledRow,
  columns,
  className,
  rowsConfig,
  updateRowsConfig,
}: IBodyProps) {
  const formattedRows: any = [];
  const getSubRow = columns
    .find((column: IColumn) => column.template === ColumnTypesEnum.DETAILS)
    ?.formatter;

  rows?.forEach((row: any, rowIndex: number) => {
    const rowConfig = (rowsConfig || {})[getRowId(row, rowIndex)];
    const cells = columns.map((column: IColumn, columnIndex: number) => {
      const key = `${column.title}_${columnIndex}`;

      if (column.template === ColumnTypesEnum.DETAILS) {
        return (
          <DetailsCell
            key={key}
            column={column}
            row={row}
            rowConfig={rowConfig}
            updateRowsConfig={updateRowsConfig}
          />
        );
      }

      return (
        <DefaultCell
          key={key}
          column={column}
          row={row}
        />
      );
    });

    const rowClassName = [
      style.table_row,
      className,
    ];

    if (disabledRow && disabledRow(row)) {
      rowClassName.push(style.table_row_hide);
    }

    if (rowConfig?.details) {
      rowClassName.push(style.table_row_selected);
    }

    formattedRows.push(
      <div
        key={rowIndex}
        className={rowClassName.join('')}
      >
        {cells}
      </div>);

    if (!rowConfig?.details || !getSubRow) return;

    formattedRows.push(
      <div
        key={`${rowIndex}-detail`}
        className={`${style.table_sub_row} ${className}`}
      >
        {getSubRow(row) || null}
      </div>);
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
