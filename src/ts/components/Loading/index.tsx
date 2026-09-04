import React from 'react';

import style from './index.module.scss';

interface ILoadingProps {
  height?: number;
}

function Loading({ height = 0 }: ILoadingProps) {
  return (
    <div
      className={style.loading}
      style={{
        minHeight: height ? `${height}px` : 'auto',
      }}
    >
      ...
    </div>
  );
}

export default Loading;
