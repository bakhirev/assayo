import React, { useEffect, useState } from 'react';

import { shuffle } from './index';
import Info from './Info';
import style from './index.module.scss';

const DURATION = {
  MIN: 5,
  BASE: 10,
};

const animations = [
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'linear',
  'cubic-bezier(0.1, 0.7, 1, 0.1)',
];

function getRandom(max: number) {
  return Math.floor(Math.random() * (max - 0 + 1)) + 0;
}

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
  const modeIndex = getRandom(animations.length - 1);
  const [mode] = useState<string>(animations[modeIndex]);

  useEffect(() => {
    shuffle(animations);
  }, []);

  if (!title) return null;
  const duration = DURATION.MIN + (DURATION.BASE * (1 - speed)) * 3;
  const classForMove = canStart ? style.races_track_animation : '';

  return (
    <div className={`${style.races_track} ${type || ''}`}>
      {canStart && (
        <Info
          title={title}
          duration={duration}
        />
      )}
      <div
        className={`${style.races_track_car} ${type || ''} ${classForMove || ''}`}
        style={{
          animationTimingFunction: mode,
          animationDuration: `${duration}s`,
        }}
      >
        <div className={`${style.races_track_car_title} ${type || ''}`}>
          {title}
        </div>
      </div>
    </div>
  );
}

Track.defaultProps = {
  type: '',
  canStart: false,
};

export default Track;
