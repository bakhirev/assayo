import React, { useEffect, useState } from 'react';

import { getRandomLevel } from '../helpers/level';
import Blocks from './Blocks';

import style from '../style/map.module.scss';

function getCitySize(percent: number): [number, number] {
  if (percent > 70) return [20, 20];
  if (percent > 60) return [18, 18];
  if (percent > 50) return [16, 16];
  if (percent > 40) return [14, 14];
  if (percent > 20) return [12, 12];
  if (percent > 10) return [10, 10];
  return [8, 8];
}

interface ICityMapProps {
  percent: number;
}

function CityMap({
  percent,
}: ICityMapProps): React.ReactElement | null {
  const size = getCitySize(percent || 5);
  const defaultLevel = getRandomLevel(...size);
  const [level, setLevel] = useState<any>(defaultLevel);

  useEffect(() => {
    const newSize = getCitySize(percent || 5);
    const newLevel = getRandomLevel(...newSize);
    setLevel(newLevel);
  }, [percent]);

  const cellSize = 20;
  const paddingTop = (24 - level.length) / 2;
  const paddingLeft = (24 - level[0].length) / 2;

  return (
    <div
      className={style.city_builder_wrapper}
      style={{
        padding: `${paddingTop * cellSize}px ${paddingLeft * cellSize}px`,
        maxWidth: 24 * cellSize,
        backgroundImage: 'url(./assets/games/green.png)',
      }}
    >
      <div className={style.city_builder}>
        <Blocks level={level} />
      </div>
    </div>
  );
}

export default CityMap;
