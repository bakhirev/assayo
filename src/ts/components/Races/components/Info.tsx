import React from 'react';

import style from '../styles/info.module.scss';

interface IInfoProps {
  title: string;
  duration: number;
}

function Info({
  title,
  duration,
}: IInfoProps): React.ReactElement | null {
  console.log(title);
  return (
    <div
      className={style.races_track_info}
      style={{
        animationDelay: `${duration + 1}s`,
      }}
    >
      4
    </div>
  );
}

export default Info;
