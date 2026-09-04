import React from 'react';

import { IColumn } from '../interfaces/Column';

function Column({
  template,
  title = '',
  properties,
  prefixes = '',
  suffixes = '',
  formatter,
  className = '',
  style,
  isFixed = false,
  isSortable = false,
  isResizable = false,
  isDraggable = false,
  isShow = true,
  minWidth,
  width,
  onClick,
}: IColumn): React.JSX.Element {
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

export default Column;
