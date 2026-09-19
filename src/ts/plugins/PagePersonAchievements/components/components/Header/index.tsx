import React from 'react';

import style from "./index.module.scss";

interface HeaderProps {
  user?: any;
  experience: number;
}

function Header({ user, experience }: HeaderProps): React.ReactElement {
  const level = (experience / 400) >> 0;
  const exp = experience - level * 400;
  const formattedExp = exp > 0 ? `XP +${exp}` : `XP - ${exp}`;
  const width = Math.min(Math.round((exp * 100) / 400), 100);

  let icon = './assets/achievements/moreLongWaitPR.svg';
  if (level < 10) icon = './assets/achievements/longWaitPR.svg';
  else if (level < 30) icon = './assets/achievements/adam.svg';
  else if (level < 60) icon = './assets/achievements/moreDaysInProject.svg';

  return (
    <div className={style.person_achievements_header}>
      <div className={style.person_achievements_header_left}>
        <img
          alt=""
          className={style.person_achievements_header_left_svg}
          src={icon}
        />
      </div>

      <div className={style.person_achievements_header_center}>
        <p className={style.person_achievements_header_title}>
          {user?.author}
        </p>
        <div className={style.person_achievements_header_progress}>
          <div
            className={style.person_achievements_header_progress_value}
            style={{ width: `${width}%` }}
          />
        </div>
        <p className={style.person_achievements_header_experience}>
          {formattedExp}
        </p>
      </div>

      <div className={style.person_achievements_header_right}>
        <div className={style.person_achievements_header_level}>
          {level}
        </div>
        <div className={style.person_achievements_header_level_description}>
          LEVEL
        </div>
      </div>
    </div>
  );
}

export default Header;
