import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import UiKitButton from 'ts/components/UiKit/components/Button';
import GameBanner from 'ts/components/GameBanner';
import { shuffle } from 'ts/helpers/random';

import Track from './components/Track';

import style from './styles/index.module.scss';

interface IRacesProps {
  tracks: {
    title: string,
    speed: number,
    type?: string,
  }[];
}

function Races({
  tracks,
}: IRacesProps): React.ReactElement | null {
  const { t } = useTranslation();
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [shuffleTracks] = useState<any>([...shuffle(tracks)]);

  if (!tracks.length) return null;

  const lines = shuffleTracks.map((track: any) => {
    return (
      <Track
        key={track.title}
        title={track.title}
        position={track.position}
        speed={track.speed}
        canStart={showAnimation}
      />
    );
  });

  return (
    <>
      <GameBanner src="./assets/games/races/bg.png">
        {!showAnimation && (
          <UiKitButton
            className={style.races_button}
            onClick={() => {
              setShowAnimation(true);
            }}
          >
            {t('page.team.building.races.go')}
          </UiKitButton>
        )}
      </GameBanner>
      <div
        className={style.races_green}
        style={{
          backgroundImage: 'url(./assets/games/races/greenTop.png)',
        }}
      />
      <div className={`${style.races} scroll_x`}>
        <div style={{ minWidth: '900px' }}>
          {lines}
        </div>
      </div>
      <div
        className={style.races_green}
        style={{
          backgroundImage: 'url(./assets/games/races/greenBottom.png)',
        }}
      />
    </>
  );
}

export default Races;
