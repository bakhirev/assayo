import React, { ChangeEvent } from 'react';

import Wrapper, { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/index.module.scss';

interface IUiKitSelectProps extends IUiKitWrapperProps {
  value: any;
  placeholder?: string;
  onChange: Function;
}

function getFormattedDate(value: any) {
  const type = typeof value;
  if (type === 'string') return value.substring(0, 10);
  if (type === 'number') return (new Date(value)).toISOString().substring(0, 10);
  return undefined;
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
        value={getFormattedDate(value)}
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
