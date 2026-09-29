import React, { ChangeEvent } from 'react';

import { getHumanReadableWeek } from 'ts/helpers/formatter';

import Wrapper, { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/index.module.scss';

interface IUiKitSelectProps extends IUiKitWrapperProps {
  value: any;
  placeholder?: string;
  onChange: Function;
}

function UiKitDateWeek({
  title,
  description,
  help,
  error,
  className,

  value,
  placeholder = 'Введите значение',
  onChange,
}: IUiKitSelectProps) {
  const formattedValue = getHumanReadableWeek(value) || value;
  return (
    <Wrapper
      title={title}
      description={description}
      help={help}
      error={error}
      className={`${className || ''} ${style.ui_kit_date_week}`}
    >
      <input
        type="week"
        value={value || ''}
        placeholder={placeholder}
        className={style.ui_kit_common}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value.split('T').shift();
          if (onChange) onChange(value);
        }}
      />
      <span className={style.ui_kit_date_week_value}>
        {formattedValue}
      </span>
    </Wrapper>
  );
}

export default UiKitDateWeek;
