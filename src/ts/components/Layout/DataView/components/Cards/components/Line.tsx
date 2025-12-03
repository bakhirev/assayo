import React from 'react';

import { useTranslation } from 'ts/components/Translation';
import { IColumn } from 'ts/components/Table/interfaces/Column';

import style from '../styles/index.module.scss';

interface ILineProps {
  column: IColumn,
  item: any,
  value?: string | number | boolean | null;
  className?: string | Function,
}

function Line({
  column,
  item,
  value,
  className,
}: ILineProps): JSX.Element | null {
  const { t } = useTranslation();
  const columnClassName = typeof column.className === 'function'
    ? column.className('body', item)
    : column.className;

  const type = typeof value;
  if (!column.title
   || type === 'undefined'
   || value === ''
   || (type === 'number' && isNaN(value as number))
   || (type === 'object' && !value)) return null;

  return (
    <div className={`${style.card_line} ${className || ''} ${columnClassName || ''}`}>
      <div className={style.card_line_title}>
        {t(column.title)}
      </div>
      <div className={style.card_line_value}>
        {value}
      </div>
    </div>
  );
}

Line.defaultPeops = {
  className: '',
};

export default Line;
