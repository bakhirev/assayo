import React from 'react';

import Info from './Info';
import Car from './Car';

import style from '../styles/index.module.scss';

const DURATION = {
  MIN: 10,
  BASE: 20,
};

interface ITrackProps {
  title: string;
  speed: number;
  type?: string;
  canStart?: boolean;
}

function Track({
  title,
  speed,
  type,
  canStart,
}: ITrackProps): React.ReactElement | null {
  if (!title) return null;
  const duration = DURATION.MIN + (DURATION.BASE * (1 - speed)) * 3;

  return (
    <div
      className={`${style.races_track} ${type || ''}`}
      style={{
        backgroundImage: 'url(./assets/games/races/road.png)',
      }}
    >
      {canStart && (
        <Info
          title={title}
          duration={duration}
        />
      )}
      <Car
        title={title}
        duration={duration}
        type={type}
        canStart={canStart}
      />
    </div>
  );
}

Track.defaultProps = {
  type: '',
  canStart: false,
};

export default Track;
