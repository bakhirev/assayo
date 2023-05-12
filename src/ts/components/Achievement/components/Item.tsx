import React from 'react';

import ALL_ACHIEVEMENTS from 'ts/helpers/achievement/constants/list';

import style from '../styles/index.module.scss';

interface IAchievementProps {
  type: string;
}

function Achievement({ type }: IAchievementProps) {
  if (!ALL_ACHIEVEMENTS[type]) return null;

  const [title, description, statusIndex] = ALL_ACHIEVEMENTS[type];
  const className = [
    style.achievement_good,
    style.achievement_middle,
    style.achievement_bad,
  ][statusIndex];

  return (
    <div className={style.achievement}>
      <div className={style.achievement_icon_container}>
        <div className={`${style.achievement_icon} ${className || ''}`}>
          <img
            className={style.achievement_icon_svg}
            src={`./assets/achievements/${type}.svg`}
          />
        </div>
      </div>
      <div className={style.achievement_title}>
        {title}
      </div>
      <div className={style.achievement_description}>
        {description}
      </div>
    </div>
  );
}

export default Achievement;
