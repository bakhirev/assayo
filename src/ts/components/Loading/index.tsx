import React from 'react';

import style from './index.module.scss';

interface ILoadingProps {
  height?: number;
}

function Loading({ height }: ILoadingProps) {
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

Loading.defaultProps = {
  height: 0,
};

export default Loading;
