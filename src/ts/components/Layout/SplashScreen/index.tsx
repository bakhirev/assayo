import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Logo } from 'ts/components/Layout';

import splashScreenStore from './store';
import style from './index.module.scss';
import progress from './progress.module.scss';

const SplashScreen = observer((): React.ReactElement | null  => {
  useEffect(() => {
    if (!splashScreenStore.isOpen) return;
    setTimeout(() => {
      splashScreenStore.hide();
    }, splashScreenStore.delay);
  }, [splashScreenStore.isOpen]);

  if (!splashScreenStore.isOpen) return null;

  return (
    <div
      className={style.splash_screen}
      style={{ animationDelay: splashScreenStore.getDelay(100) }}
    >
      <div
        className={style.splash_screen_container}
        style={{ animationDelay: splashScreenStore.getDelay(-1400) }}
      >
        <Logo showDescription />
        <div className={progress.progress_bar}>
          <div
            className={progress.progress_bar_line}
            style={{ animationDuration: splashScreenStore.getDelay(-1100) }}
          />
        </div>
      </div>
    </div>
  );
});

export default SplashScreen;
