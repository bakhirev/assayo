import React, { ReactNode } from 'react';

import style from '../index.module.scss';

interface LineProps {
  left: number;
  right: number;
  children?: ReactNode | string | number | null;
}

function Line({
  left,
  right,
  children,
}: LineProps): React.ReactElement | null {
  return (
    <div
      className={style.gantt_chart_line}
      style={{
        left: `${left}%`,
        right: `${100 - right}%`,
      }}
    >
      {children}
    </div>
  );
}

export default Line;
