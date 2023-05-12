import React, { ReactNode } from 'react';

import style from './index.module.scss';

interface IPageWrapperProps {
  children: ReactNode | string | null;
  template?: 'box' | 'table';
}

function PageWrapper({
  children,
  template,
}: IPageWrapperProps) {
  const className = template
    ? `${style.main_wrapper} ${style.main_wrapper_white}`
    : `${style.main_wrapper}`;

  const css = template === 'table'
    ? { paddingTop: 0 }
    : {};

  return (
    <div
      className={className}
      style={css}
    >
      {children}
    </div>
  );
}


export default PageWrapper;
