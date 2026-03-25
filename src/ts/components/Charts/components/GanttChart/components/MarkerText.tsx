import React from 'react';

import style from '../index.module.scss';

interface MarkerTextProps {
  title?: string;
  left: number;
  right: number;
}

function MarkerText({
  title,
  left,
  right,
}: MarkerTextProps): React.ReactElement | null {
  return (
    <div
      className={style.gantt_chart_marker_bg}
      style={{
        left: `${left}%`,
        right: `${100 - right}%`,
      }}
    >
      {title || ''}
    </div>
  );
}

export default MarkerText;
