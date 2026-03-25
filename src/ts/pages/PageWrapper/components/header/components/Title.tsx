import React from 'react';

import { useTranslation } from 'ts/components/Translation';

import style from '../index.module.scss';

interface TitleProps {
  text?: string;
}

function Title({ text }: TitleProps) {
  const { t } = useTranslation();
  const title = text
    ? t(text)
    : t('plugin.team_total.sidebar');

  return (
    <h2 className={style.header_title}>
      {title}
    </h2>
  );
}

export default Title;
