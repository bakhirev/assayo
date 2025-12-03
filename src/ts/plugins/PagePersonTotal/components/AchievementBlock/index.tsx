import React from 'react';
import { useTranslation } from 'react-i18next';

import Achievements from 'ts/components/Achievement';

import style from './index.module.scss';

interface IAchievementBlockProps {
  title: string;
  achievements: string[];
}

function AchievementBlock({ title, achievements }: IAchievementBlockProps) {
  const { t } = useTranslation();
  if (!achievements?.length) return null;
  return (
    <>
      <h3 className={style.total_achievements_title}>
        {t(title)}
      </h3>
      <Achievements list={achievements} />
    </>
  );
}

export default AchievementBlock;
