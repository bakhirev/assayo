import React from 'react';

import Achievement from './components/Item';
import style from './styles/index.module.scss';

interface IAchievementsProps {
  list: string[];
}

function Achievements({ list }: IAchievementsProps) {
  const items = list?.map((type: string) => (
    <Achievement
      key={type}
      type={type}
    />
  ));

  return (
    <div className={style.achievement_container}>
      {items}
    </div>
  );
}

export default Achievements;
