import React from 'react';

import ISort from 'ts/interfaces/Sort';

import { IColumn } from './interfaces/Column';
import Header from './components/Header';
import Body from './components/Body';
import getDefaultColumnWidth from './helpers/getDefaultColumnWidth';
import getColumnConfigs from './helpers/getColumnConfigs';
import getDefaultProps from './helpers/getDefaultProps';

import style from './styles/index.module.scss';

interface ITableProps {
  rows: any[];
  sort?: ISort[];
  disabledRow?: (row: any) => boolean;
  updateSort?: Function,
  children: React.ReactNode | React.ReactNode[];
}

function Table({
  rows = [],
  sort = [],
  disabledRow,
  updateSort,
  children,
}: ITableProps): React.ReactElement | null {
  if (!rows || !rows.length) return null;

  const refTable = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const defaultColumns = getDefaultProps(children) as IColumn[];
  const defaultWidth = getDefaultColumnWidth(defaultColumns, refTable);
  const columns = getColumnConfigs(defaultColumns, defaultWidth, sort);

  return (
    <div className={`${style.table_wrapper}`}>
      <div
        ref={refTable}
        className={`${style.table}`}
      >
        <Header
          columns={columns}
          updateSort={updateSort}
        />
        <Body
          rows={rows}
          columns={columns}
          disabledRow={disabledRow}
        />
      </div>
    </div>
  );
}

Table.defaultProps = {
  rows: [],
  sort: [],
  updateSort: () => {},
};

export default Table;
