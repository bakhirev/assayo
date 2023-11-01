import React, { useState } from 'react';

import UiKitButton from 'ts/components/UiKit/components/Button';
import localization from 'ts/helpers/Localization';

import Track from './Track';
import style from './index.module.scss';

export function shuffle(items: any[]) {
  // @ts-ignore
  for (let j, x, i = items.length; i; j = parseInt(Math.random() * i), x = items[--i], items[i] = items[j], items[j] = x) {}
  return items;
}

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
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  if (!tracks.length) return null;

  const lines = shuffle(tracks).map((track: any) => {
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
    <div className={style.races}>
      {!showAnimation && (
        <UiKitButton
          className={style.races_button}
          onClick={() => {
            setShowAnimation(true);
          }}
        >
          {localization.get('uiKit.races.go')}
        </UiKitButton>
      )}
      {lines}
    </div>
  );
}

export default Races;
