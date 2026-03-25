import React from 'react';
import { observer } from 'mobx-react-lite';

import filtersInHeaderStore from 'ts/store/FiltersInHeader';
import statisticStore from 'ts/store/Statistics';

import style from '../index.module.scss';

interface IInputProps {
  type: string;
  placeholder?: string;
}

const Input = observer(({
  type,
  placeholder,
}: IInputProps) => {
  return (
    <input
      type="date"
      placeholder={placeholder || ''}
      value={filtersInHeaderStore[type] ?? ''}
      className={style.header_filters_input}
      onChange={(event: any) => {
        filtersInHeaderStore.updateProperty(type, event.target.value);
        statisticStore.updateStatistic();
      }}
    />
  );
});

export default Input;
