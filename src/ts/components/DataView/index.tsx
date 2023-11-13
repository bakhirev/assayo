import React, { useState } from 'react';

import ISort from 'ts/interfaces/Sort';
import Table from 'ts/components/Table';
import Cards from 'ts/components/Cards';

import style from './index.module.scss';

interface IDataViewProps {
  rows: any[];
  type?: string;
  sort?: ISort[];
  className?: string,
  disabledRow?: (row: any) => boolean;
  updateSort?: Function,
  children: React.ReactNode | React.ReactNode[];
}

function DataView({
  rows = [],
  sort = [],
  type,
  className,
  disabledRow,
  updateSort,
  children,
}: IDataViewProps): React.ReactElement | null {
  const [localType, setType] = useState<string>(type || 'table');

  if (!rows || !rows.length) return null;

  const icon = {
    table: './assets/icons/Cards.svg',
    cards: './assets/icons/Table.svg',
  }[localType];

  const title = {
    table: 'Отобразить карточками',
    cards: 'Отобразить таблицой',
  }[localType];

  return (
    <>
      <img
        title={title}
        src={icon}
        className={style.data_view_icon}
        onClick={() => {
          setType(localType === 'table' ? 'cards' : 'table');
        }}
      />

      {localType === 'table' && (
        <Table
          rows={rows}
          sort={sort}
          disabledRow={disabledRow}
          updateSort={updateSort}
        >
          {children}
        </Table>
      )}

      {localType === 'cards' && (
        <Cards
          items={rows}
          className={className}
        >
          {children}
        </Cards>
      )}
    </>
  );
}

DataView.defaultProps = {
  rows: [],
  sort: [],
  type: 'table',
  updateSort: () => {
  },
};

export default DataView;
