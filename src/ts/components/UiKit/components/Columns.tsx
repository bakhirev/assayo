import React, { ReactNode } from 'react';

import style from '../styles/wrapper.module.scss';

export interface IUiKitColumnsProps {
  columns?: number;
  className?: string;
  children?: ReactNode | string | null;
}

function UiKitColumns({
  columns,
  className,
  children,
}: IUiKitColumnsProps) {
  return (
    <div
      className={`${style.ui_kit_wrapper} ${className || ''}`}
      style={{ columnCount: columns || 2 }}
    >
      {children}
    </div>
  );
}

export default UiKitColumns;
