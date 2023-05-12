import React, { ReactNode } from 'react';

import style from './index.module.scss';

interface IRecommendationsProps {
  children: ReactNode | string | null;
  template?: string;
}

function Recommendations({
  children,
  template,
}: IRecommendationsProps) {
  const className = template === 'box'
    ? `${style.main_wrapper} ${style.main_wrapper_white}`
    : `${style.main_wrapper}`;

  return (
    <div className={className}>
      {children}
    </div>
  );
}


export default Recommendations;
