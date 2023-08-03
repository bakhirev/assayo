import React from 'react';

import style from './index.module.scss';

interface IInfoProps {
  title: string;
  duration: number;
}

function Info({
  title,
  duration,
}: IInfoProps): React.ReactElement | null {
  return (
    <div
      className={style.races_track_info}
      style={{
        animationDelay: `${duration + 1}s`,
      }}
    >
      {title}
    </div>
  );
}

export default Info;
