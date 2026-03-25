import React from 'react';

import style from '../styles/index.module.scss';

interface HorizontalScaleProps {
  text: number | string;
  bottom: number;
}

function Line({
  text,
  bottom,
}: HorizontalScaleProps): React.ReactElement | null {
  if (!text) return null;

  return (
    <div
      className={style.vertical_bar_line}
      style={{ bottom: `${bottom}%` }}
    >
      <span className={style.vertical_bar_line_text}>
        {text}
      </span>
    </div>
  );
}

export default Line;
