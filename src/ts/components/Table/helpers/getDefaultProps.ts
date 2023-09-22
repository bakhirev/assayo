import React from 'react';

import { ColumnTypesEnum } from '../interfaces/Column';
import style from '../styles/index.module.scss';

export default function getDefaultProps(children: React.ReactNode) {
  return React.Children.map(children, (child: React.ReactNode) => {
    if (!React.isValidElement(child)) return null;

    const template = child?.props?.template || ColumnTypesEnum.STRING;

    // @ts-ignore
    const className = child?.props?.className || {
      [ColumnTypesEnum.STRING]: '',
      [ColumnTypesEnum.NUMBER]: style.table_cell_number,
      [ColumnTypesEnum.SHORT_NUMBER]: style.table_cell_number,
    }[template || ''] || '';

    // @ts-ignore
    const defaultWidth = child?.props?.width || {
      [ColumnTypesEnum.STRING]: 200,
      [ColumnTypesEnum.NUMBER]: 110,
      [ColumnTypesEnum.SHORT_NUMBER]: 70,
    }[template || ''] || 0;

    // @ts-ignore
    const minWidth = child?.props?.minWidth || 40;

    // @ts-ignore
    const isSortable = child?.props?.isSortable // @ts-ignore
      ? child?.props?.isSortable
      : [ColumnTypesEnum.STRING, ColumnTypesEnum.NUMBER, ColumnTypesEnum.SHORT_NUMBER].includes(template);

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