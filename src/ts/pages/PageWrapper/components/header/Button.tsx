import React from 'react';

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
  return (
    <button
      className={style.header_filters_fast_button}
      onClick={() => {
        settingsStore.setFilterByDateType(type);
      }}
    >
      {title || ''}
    </button>
  );
}


export default Button;
