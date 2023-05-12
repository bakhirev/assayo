import React from 'react';
import { observer } from 'mobx-react-lite';

import settingsStore from 'ts/store/Settings';

import style from '../../styles/filters.module.scss';

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
      value={settingsStore[type] ?? ''}
      className={style.header_filters_input}
      onChange={(event: any) => {
        settingsStore.updateProperty(type, event.target.value);
      }}
    />
  );
});

export default Input;
