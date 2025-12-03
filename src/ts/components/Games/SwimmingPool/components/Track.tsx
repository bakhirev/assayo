import React from 'react';

import ShowSymbol from '../../ShowSymbol';

import style from '../styles/track.module.scss';

function getProps(className: string, src?: string) {
  return src ? {
    className,
    style: {
      backgroundImage: `url(${src})`,
    },
  } : {
    className,
  };
}

interface ITrackProps {
  title: string;
  value: number;
  maxValue: number;
}

function Track({
  title,
  value,
  maxValue,
}: ITrackProps): React.ReactElement | null {
  if (!title) return null;

  const percent = (maxValue * 1.1) / 100;
  const width = Math.ceil(value / percent);

  return (
    <div {...getProps(style.swimming_pool_track, './assets/games/swimmingPool/track_title.png')}>
      <ShowSymbol
        text={title}
        length={10}
      />
      <div {...getProps(style.swimming_pool_track_value, './assets/games/swimmingPool/block.png')}>
        {value}
      </div>
      <div {...getProps(style.swimming_pool_track_line, './assets/games/swimmingPool/water.png')}>
        <div
          className={style.swimming_pool_track_chart}
          style={{ width: `${width}%` }}
        >
          <img
            className={style.swimming_pool_track_man}
            src="./assets/games/swimmingPool/man.png"
          />
        </div>
      </div>
    </div>
  );
}

export default Track;
