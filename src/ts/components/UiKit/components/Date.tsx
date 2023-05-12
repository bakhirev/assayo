import React, { ChangeEvent } from 'react';

import Wrapper, { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/index.module.scss';

interface IUiKitSelectProps extends IUiKitWrapperProps {
  value: any;
  placeholder?: string;
  onChange: Function;
}

function UiKitDate({
  title,
  description,
  help,
  error,
  className,

  value,
  placeholder,
  onChange,
}: IUiKitSelectProps) {
  const formattedValue = value?.length > 10
    ? value.substring(0, 10)
    : value;

  return (
    <Wrapper
      title={title}
      description={description}
      help={help}
      error={error}
      className={className}
    >
      <input
        type="date"
        value={formattedValue}
        placeholder={placeholder}
        className={style.ui_kit_common}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (onChange) onChange(`${event.target.value}T00:00:00.000Z`);
        }}
      />
    </Wrapper>
  );
}

UiKitDate.defaultProps = {
  placeholder: 'Введите значение',
};

export default UiKitDate;
