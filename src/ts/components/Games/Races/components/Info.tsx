import React from 'react';

import { t } from 'ts/helpers/Localization';
import { getShortNumber } from 'ts/helpers/formatter';

import style from '../styles/info.module.scss';

interface IInfoProps {
  title: string;
  duration: number;
  taskInDay: number;
}

function Info({
  title,
  duration,
  taskInDay,
}: IInfoProps): React.ReactElement | null {
  return (
    <div
      className={style.races_track_info}
      style={{
        animationDelay: `${duration + 1}s`,
      }}
      title={`${getShortNumber(taskInDay)} ${t('page.team.total.workSpeed.title')}`}
    >
      {title}
    </div>
  );
}

export default Info;
