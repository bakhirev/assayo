import React, { ReactNode } from 'react';

import style from './index.module.scss';
import PageBox from './Box';

interface IPageColumnProps {
  template?: string;
  children: ReactNode | string | null;
}

function PageColumn({
  template,
  children,
}: IPageColumnProps) {
  if (template) return (
    <PageBox className={style.main_wrapper_item}>
      {children}
    </PageBox>
  );

  return (
    <div className={style.main_wrapper_item}>
      {children}
    </div>
  );
}

PageColumn.defaultProps = {
  template: undefined,
};

export default PageColumn;
