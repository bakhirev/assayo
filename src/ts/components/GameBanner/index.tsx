import React, { ReactNode } from 'react';

import style from './index.module.scss';

interface IGameBannerProps {
  src?: string;
  children?: ReactNode | string | null;
}

function GameBanner({
  src,
  children,
}: IGameBannerProps): React.ReactElement | null {
  if (!src) return null;

  return (
    <div
      className={style.game_banner}
      style={{ backgroundImage: `url(${src})` }}
    >
      {children ? (
        <div className={style.game_banner_description}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default GameBanner;
