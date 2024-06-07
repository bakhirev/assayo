import React, { ReactNode } from 'react';

import style from './index.module.scss';

interface IPageWrapperProps {
  children: ReactNode | string | null;
  className?: string;
  template?: 'box' | 'table';
}

function PageWrapper({
  children,
  className,
  template,
}: IPageWrapperProps) {
  const localClassName = template
    ? `${style.main_wrapper} ${style.main_wrapper_white}`
    : `${style.main_wrapper}`;

  const css = template === 'table'
    ? { paddingTop: 0 }
    : {};

  return (
    <div
      className={`${localClassName} ${className || ''}`}
      style={css}
    >
      {children}
    </div>
  );
}


export default PageWrapper;
