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
        speed={track.speed}
        canStart={showAnimation}
      />
    );
  });

  return (
    <>
      <GameBanner src="./assets/games/races.jpg">
        {!showAnimation && (
          <UiKitButton
            className={style.races_button}
            onClick={() => {
              setShowAnimation(true);
            }}
          >
            {t('uiKit.races.go')}
          </UiKitButton>
        )}
      </GameBanner>
      <div className={style.races}>
        {lines}
      </div>
    </>
  );
}

export default Races;
