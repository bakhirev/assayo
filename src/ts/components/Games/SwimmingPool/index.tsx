import React, { useState } from 'react';

import { shuffle } from 'ts/helpers/random';

import GameBanner from '../GameBanner';
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
      <GameBanner src="./assets/games/swimmingPool/bg.png" />
      <div
        className={style.swimming_pool_top_border}
        style={{
          backgroundImage: 'url(./assets/games/swimmingPool/block2.png)',
        }}
      />
      <div className="scroll_x">
        <div style={{ minWidth: '900px' }}>
          {lines}
        </div>
      </div>
      <div
        className={style.swimming_pool_bottom_border}
        style={{
          backgroundImage: 'url(./assets/games/swimmingPool/block2.png)',
        }}
      />
    </>
  );
}

export default SwimmingPool;
