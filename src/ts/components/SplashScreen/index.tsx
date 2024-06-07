import React, { useEffect } from 'react';

import Logo from 'ts/pages/PageWrapper/components/sidebar/Logo';
import globalScroll from 'ts/helpers/globalScroll';

import style from './index.module.scss';
import progress from './progress.module.scss';

function SplashScreen(): React.ReactElement | null {

  useEffect(() => {
    globalScroll.off(5400);
  }, []);

  return (
    <div className={style.splash_screen}>
      <div className={style.splash_screen_container}>
        <Logo center />
        <div className={progress.progress_bar}></div>
      </div>
    </div>
  );
}

export default SplashScreen;
