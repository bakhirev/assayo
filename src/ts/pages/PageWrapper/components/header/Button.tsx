import React from 'react';

import settingsStore from 'ts/store/Settings';
import localization from 'ts/helpers/Localization';

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
      {localization.get(title)}
    </button>
  );
}


export default Button;
