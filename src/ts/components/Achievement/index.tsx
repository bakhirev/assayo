import React from 'react';

import Achievement from './components/Item';
import style from './styles/index.module.scss';

interface IAchievementsProps {
  list: string[];
}

function Achievements({ list }: IAchievementsProps) {
  const items = list?.map((code: string) => (
    <Achievement
      key={code}
      code={code}
    />
  ));

  return (
    <div className={style.achievement_container}>
      {items}
    </div>
  );
}

export default Achievements;
