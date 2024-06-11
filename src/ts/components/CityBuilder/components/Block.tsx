import React from 'react';

import style from '../style/map.module.scss';
import { getRandom } from '../helpers/level';

interface IBlockProps {
  type?: string;
}

function Block({
  type,
}: IBlockProps): React.ReactElement | null {

  const className = [style.city_builder_block];
  const defaultSprite = './assets/games/road.png';
  const src = {
    home: `./assets/games/home${getRandom(2)}.png`,
    road: './assets/games/road.png',
  }[type || ''] || defaultSprite;

  if (type === 'green') {
    return (<div className={className.join(' ')} />);
  }

  return (
    <img
      className={className.join(' ')}
      src={src}
    />
  );
}

export default Block;
