import React, { ReactNode } from 'react';

import style from '../index.module.scss';

interface LineProps {
  right: number;
  children?: ReactNode | string | number | null;
}

function Circle({
  right,
  children,
}: LineProps): React.ReactElement | null {
  return (
    <div
      className={style.gantt_chart_circle}
      style={{
        right: `${100 - right}%`,
      }}
    >
      {children}
    </div>
  );
}

export default Circle;
