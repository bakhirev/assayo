import React from 'react';

import Logo from 'ts/pages/PageWrapper/components/sidebar/Logo';

import style from './index.module.scss';
import progress from './progress.module.scss';

function SplashScreen(): React.ReactElement | null {

  return (
    <div className={style.splash_screen}>
      <div className={style.splash_screen_container}>
        <Logo />
        <div className={progress.progress_bar}></div>
      </div>
    </div>
  );
}

export default SplashScreen;
