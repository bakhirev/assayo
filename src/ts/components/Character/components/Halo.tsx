import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';

import style from '../styles/index.module.scss';

interface IWeaponProps {
  tasksTypes?: IHashMap<number>;
}

function Weapon({ tasksTypes }: IWeaponProps) {
  if (!tasksTypes) return null;

  console.log(tasksTypes);
  // if (tasksNumber > 750) level = 1;
  // if (tasksNumber > 1000) level = 1;
  // if (tasksNumber > 1500) level = 1;

  return (
    <div
      className={style.character_halo}
      style={{ backgroundImage: 'url("./assets/character/halo/1.png")' }}
    />
  );
}

export default Weapon;
