import React, { useState } from 'react';

import UiKitButton from 'ts/components/UiKit/components/Button';

import CityMap from './components/CityMap';
import style from './style/index.module.scss';

interface ICityBuilderProps {
}

function CityBuilder({}: ICityBuilderProps): React.ReactElement | null {
  const [percent, setPercent] = useState<number>(5);

  return (
    <>
      <UiKitButton
        className={style.races_button}
        onClick={() => {
          setPercent(Math.random() * 100);
        }}
      >
        rand
      </UiKitButton>
      <CityMap percent={percent} />
    </>
  );
}

export default CityBuilder;
