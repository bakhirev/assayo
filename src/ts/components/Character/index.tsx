import React from 'react';

import Halo from './components/Halo';
import {
  getWeaponLevel,
  getWingsLevel,
} from './helpers';
import Layers from './components/Layers';
import style from './styles/index.module.scss';

interface ICharacterProps {
  user: any;
}

function Character({ user }: ICharacterProps) {
  if (!user) return null;

  return (
    <div className={style.character}>
      <Halo tasksTypes={user?.types} />
      <Layers
        type="weapon"
        level={getWingsLevel(user?.allDaysInProject)}
      />
      <Layers
        type="weapon"
        level={getWeaponLevel(user?.tasks?.length)}
      />
    </div>
  );
}

export default Character;
