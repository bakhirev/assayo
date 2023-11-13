import React from 'react';

import ALL_ACHIEVEMENTS from 'ts/helpers/achievement/constants/list';
import localization from 'ts/helpers/Localization';

import style from '../styles/index.module.scss';

interface IAchievementProps {
  code: string;
}

function Achievement({ code }: IAchievementProps) {
  if (!ALL_ACHIEVEMENTS[code]) return null;

  const title = localization.get(`achievements.${code}.title`);
  const description = localization.get(`achievements.${code}.description`);

  const statusIndex = ALL_ACHIEVEMENTS[code];
  const className = [
    style.achievement_good,
    style.achievement_middle,
    style.achievement_bad,
  ][statusIndex - 1];

  return (
    <div className={style.achievement}>
      <div className={style.achievement_icon_container}>
        <div className={`${style.achievement_icon} ${className || ''}`}>
          <img
            className={style.achievement_icon_svg}
            src={`./assets/achievements/${code}.svg`}
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
