import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import ALL_ACHIEVEMENTS from 'ts/helpers/achievement/constants/list';

import style from '../styles/index.module.scss';

interface IAchievementProps {
  code: string;
}

function Achievement({ code }: IAchievementProps) {
  const { t } = useTranslation();
  if (!ALL_ACHIEVEMENTS[code]) return null;

  const statusIndex = ALL_ACHIEVEMENTS[code];
  const className = [
    style.achievement_good,
    style.achievement_middle,
    style.achievement_bad,
    style.achievement_publicity,
  ][statusIndex - 1];

  return (
    <div className={style.achievement}>
      <div className={style.achievement_icon_container}>
        <div className={`${style.achievement_icon} ${className || ''}`}>
          <img
            alt=""
            className={style.achievement_icon_svg}
            src={`./assets/achievements/${code}.svg`}
          />
        </div>
      </div>
      <div className={style.achievement_title}>
        {t(`achievements.${code}.title`)}
      </div>
      <div className={style.achievement_description}>
        {t(`achievements.${code}.description`)}
      </div>
    </div>
  );
}

export default Achievement;
