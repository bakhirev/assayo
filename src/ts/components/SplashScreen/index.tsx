import React, { useEffect, useState } from 'react';

import Logo from 'ts/pages/PageWrapper/components/sidebar/Logo';

import style from './index.module.scss';
import progress from './progress.module.scss';

const TEXT: string[] = [
  'обработка файлов',
  'обработка коммитов',
  'нормализация данных',
  'анализ времени',
  'анализ состава команды',
  'оценка стоимости проекта',
  'оценка затрат на разработку',
  'расчёт общих рекомендаций',
  'расчёт частных рекомендаций',
  'аудит суммарных затрат',
  'расчёт персональных ачивок',
  'анализ эффективности',
].reverse();

function SplashScreen(): React.ReactElement | null {
  const [timer, setTimer] = useState<any>(null);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (timer) return;

    let localIndex = 0;
    setTimer(setInterval(() => {
      localIndex = localIndex === 0
        ? TEXT.length - 1
        : localIndex - 1;
      setIndex(localIndex);
    }, 200));

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={style.splash_screen}>
      <div className={style.splash_screen_container}>
        <Logo />
        <div className={progress.progress_bar}></div>
        <p className={style.splash_screen_description}>
          {TEXT[index] || ''}
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;
