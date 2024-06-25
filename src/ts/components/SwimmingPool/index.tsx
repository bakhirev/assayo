import React, { useState } from 'react';

import GameBanner from 'ts/components/GameBanner';
import { shuffle } from 'ts/helpers/random';

import Track from './components/Track';

import style from './styles/index.module.scss';

interface IRacesProps {
  tracks: any[];
}

function SwimmingPool({
  tracks,
}: IRacesProps): React.ReactElement | null {
  const [shuffleTracks] = useState<any>([...shuffle(tracks)]);

  if (!tracks.length) return null;

  const lines = shuffleTracks.map((track: any) => {
    return (
      <Track
        key={track.title}
        title={track.title}
        value={track.value}
        maxValue={300}
      />
    );
  });

  return (
    <>
      <GameBanner src="./assets/games/races/bg.png" />
      <div
        className={style.swimming_pool_top_border}
        style={{
          backgroundImage: 'url(./assets/games/swimmingPool/track_title.png)',
        }}
      />
      {lines}
      <div
        className={style.swimming_pool_bottom_border}
        style={{
          backgroundImage: 'url(./assets/games/swimmingPool/track_title.png)',
        }}
      />
    </>
  );
}

export default SwimmingPool;
