import React from 'react';

import { ColumnTypes } from '../interfaces/Column';
import style from '../styles/index.module.scss';

export default function getDefaultProps(children: React.ReactNode) {
  return React.Children.map(children, (child: React.ReactNode) => {
    if (!React.isValidElement(child)) return null;

    const template = child?.props?.template || ColumnTypes.STRING;

    // @ts-ignore
    const className = child?.props?.className || {
      [ColumnTypes.STRING]: '',
      [ColumnTypes.NUMBER]: style.table_cell_number,
      [ColumnTypes.SHORT_NUMBER]: style.table_cell_number,
    }[template || ''] || '';

    // @ts-ignore
    const defaultWidth = child?.props?.width || {
      [ColumnTypes.SHORT_NUMBER]: 70,
    }[template || ''] || 0;

    // @ts-ignore
    const minWidth = child?.props?.minWidth || {
      [ColumnTypes.STRING]: 200,
      [ColumnTypes.NUMBER]: 110,
    }[template || ''] || 40;

    // @ts-ignore
    const isSortable = child?.props?.isSortable // @ts-ignore
      ? child?.props?.isSortable
      : [ColumnTypes.STRING, ColumnTypes.NUMBER, ColumnTypes.SHORT_NUMBER].includes(template);

    return {
      ...child.props as object,
      className,
      template,
      isSortable,
      minWidth,
      defaultWidth,
      width: undefined,
      userWidth: undefined,
    };
  });
}
