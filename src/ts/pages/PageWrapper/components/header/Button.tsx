import React from 'react';
import { useTranslation } from 'react-i18next';

import settingsStore from 'ts/store/Settings';

import style from '../../styles/filters.module.scss';

interface IButtonProps {
  title: string;
  type: string;
}

function Button({
  title,
  type,
}: IButtonProps) {
  const { t } = useTranslation();
  return (
    <button
      className={style.header_filters_fast_button}
      onClick={() => {
        settingsStore.setFilterByDateType(type);
      }}
    >
      {t(title)}
    </button>
  );
}


export default Button;
