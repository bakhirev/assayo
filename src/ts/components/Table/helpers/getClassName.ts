import { IColumn } from '../interfaces/Column';

import style from '../styles/index.module.scss';

export default function getClassName(defaultClassName: string, column: IColumn, args?: any, className?: string) {
  const localClassName = [defaultClassName];

  if (className) {
    localClassName.push(className);
  }

  if (column.className) {
    const columnClassName = typeof column.className === 'function'
      ? column.className(...args)
      : column.className;
    localClassName.push(columnClassName);
  }

  if (column.isFixed) {
    localClassName.push(style.table_fixed);
  }

  return localClassName.join(' ');
}
