import React from 'react';
import { useTranslation } from 'react-i18next';

import style from './index.module.scss';

interface BillBoardProps {
  title: string;
  type: string;
}

function BillBoard({
  title,
  type,
}: BillBoardProps): React.ReactElement | null {
  const { t } = useTranslation();
  if (!title) return null;

  const className = type === 'cloud'
    ? style.billboard_cloud
    : style.billboard_green;

  const icon = type === 'cloud'
    ? './assets/games/cloud.png'
    : './assets/games/lawn.png';

  return (
    <div
      className={`${style.billboard} ${className}`}
      style={{
        backgroundImage: `url(${icon})`,
      }}
    >
      <div
        className={style.billboard_box}
        style={{
          backgroundImage: 'url(./assets/games/billboard1.png)',
        }}
      >
        <div className={style.billboard_title}>
          {t(title || '')}
        </div>
      </div>
    </div>
  );
}

export default BillBoard;
