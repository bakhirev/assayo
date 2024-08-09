import React from 'react';
import { useTranslation } from 'react-i18next';

import filtersInHeaderStore from 'ts/store/FiltersInHeader';
import dataGripStore from 'ts/store/DataGrip';

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
        filtersInHeaderStore.setFilterByDateType(type);
        dataGripStore.updateStatistic();
      }}
    >
      {t(title)}
    </button>
  );
}


export default Button;
