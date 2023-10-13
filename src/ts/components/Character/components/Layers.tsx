import React from 'react';

import style from '../styles/index.module.scss';

interface ILayersProps {
  type: string;
  level?: number;
}

function Layers({ type, level }: ILayersProps) {
  const content = [];

  for (let layer = level || 0; layer > 0; layer--) {
    content.push((
      <img
        key={`${type}_${layer}`}
        className={style.character_layer}
        src={`./assets/character/${type}/${layer}.png`}
      />
    ));
  }

  return (<>{content}</>);
}

export default Layers;
