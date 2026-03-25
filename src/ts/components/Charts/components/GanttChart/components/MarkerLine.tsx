import React from 'react';

import style from '../index.module.scss';

interface MarkerLineProps {
  left: number;
}

function MarkerLine({
  left,
}: MarkerLineProps): React.ReactElement | null {
  return (
    <div
      className={style.gantt_chart_marker_line}
      style={{
        left: `${left}%`,
      }}
    />
  );
}

export default MarkerLine;
