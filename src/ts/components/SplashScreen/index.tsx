import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Logo from 'ts/pages/PageWrapper/components/sidebar/Logo';

import splashScreenStore from './store';
import style from './index.module.scss';
import progress from './progress.module.scss';

const SplashScreen = observer((): React.ReactElement | null  => {
  useEffect(() => {
    if (!splashScreenStore.isOpen) return;
    setTimeout(() => {
      splashScreenStore.hide();
    }, 5400);
  }, [splashScreenStore.isOpen]);

  if (!splashScreenStore.isOpen) return null;

  return (
    <div className={style.splash_screen}>
      <div className={style.splash_screen_container}>
        <Logo center />
        <div className={progress.progress_bar}></div>
      </div>
    </div>
  );
});

export default SplashScreen;
