import React, { useEffect, useState } from 'react';

import { shuffle, getRandom } from 'ts/helpers/random';

import style from '../styles/car.module.scss';

const animations = [
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'linear',
  'cubic-bezier(0.1, 0.7, 1, 0.1)',
];

interface ICarProps {
  title: string;
  duration: number;
  type?: string;
  canStart?: boolean;
}

function Car({
  title,
  duration,
  type,
  canStart,
}: ICarProps): React.ReactElement | null {
  const modeIndex = getRandom(animations.length - 1);
  const [mode] = useState<string>(animations[modeIndex]);

  useEffect(() => {
    shuffle(animations);
  }, []);

  const classForMove = canStart ? style.races_track_car_animation : '';

  return (
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
      <img
        className={style.races_track_car_cover}
        src="./assets/games/races/car.png"
      />
    </div>
  );
}

Car.defaultProps = {
  type: '',
  canStart: false,
};

export default Car;
