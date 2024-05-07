import React, { useEffect, useState } from 'react';

import ISort from 'ts/interfaces/Sort';
import IHashMap from 'ts/interfaces/HashMap';

import { IColumn, IRowsConfig } from './interfaces/Column';
import Header from './components/Header';
import Body from './components/Body';
import getAdaptiveColumnWidth from './helpers/getAdaptiveColumnWidth';
import getColumnConfigs from './helpers/getColumnConfigs';
import getDefaultProps from './helpers/getDefaultProps';
import getRowsConfig from './helpers/getRowsConfig';

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
  const [offsetWidth, setOffsetWidth] = useState<number>(0);
  const [rowsConfig, setRowsConfig] = useState<IHashMap<IRowsConfig>>({});

  if (!rows || !rows.length) return null;

  const refTable = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const currentWidth = refTable?.current?.offsetWidth;

  useEffect(() => {
    setOffsetWidth(currentWidth);
  }, [currentWidth]);

  useEffect(() => {
    const newRowsConfig = getRowsConfig(rows, rowsConfig);
    setRowsConfig(newRowsConfig);
  }, [rows]);

  const defaultColumns = getDefaultProps(children) as IColumn[];
  const adaptiveWidth = getAdaptiveColumnWidth(defaultColumns, offsetWidth);
  const columns = getColumnConfigs(defaultColumns, adaptiveWidth, sort);
  const updateRowsConfig = (config: IRowsConfig) => {
    setRowsConfig({
      ...rowsConfig,
      [config.id]: config,
    });
  };

  return (
    <div
      ref={refTable}
      className={`${style.table_wrapper} scroll_x`}
      onTouchStart={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className={`${style.table}`}>
        <Header
          columns={columns}
          updateSort={updateSort}
        />
        <Body
          rows={rows}
          columns={columns}
          disabledRow={disabledRow}
          rowsConfig={rowsConfig}
          updateRowsConfig={updateRowsConfig}
        />
      </div>
    </div>
  );
}

Table.defaultProps = {
  rows: [],
  sort: [],
  updateSort: () => {
  },
};

export default Table;
