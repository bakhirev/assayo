import React from 'react';

import { IColumn } from '../interfaces/Column';

function Column({
  template,
  title,
  properties,
  prefixes,
  suffixes,
  formatter,
  className,
  style,
  isFixed,
  isSortable,
  isResizable,
  isDraggable,
  isShow,
  minWidth,
  width,
  onClick,
}: IColumn): JSX.Element {
  return (
    <>
      {{
        template,
        title,
        properties,
        prefixes,
        suffixes,
        formatter,
        className,
        style,
        isFixed,
        isSortable,
        isResizable,
        isDraggable,
        isShow,
        minWidth,
        width,
        onClick,
      }}
    </>
  );
}

Column.defaultProps = {
  title: '',
  prefixes: [''],
  suffixes: [''],
  formatter: undefined,
  className: '',
  isDisabled: false,
  isFixed: false,
  isSortable: false,
  isResizable: false,
  isDraggable: false,
  isShow: true,
  minWidth: undefined,
  width: undefined,
  onClick: undefined,
};

export default Column;
