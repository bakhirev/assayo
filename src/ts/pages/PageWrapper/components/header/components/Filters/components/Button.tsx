import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import filtersInHeaderStore from 'ts/store/FiltersInHeader';
import statisticStore from 'ts/store/Statistics';

import style from '../index.module.scss';

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
        statisticStore.updateStatistic();
      }}
    >
      {t(title)}
    </button>
  );
}


export default Button;
