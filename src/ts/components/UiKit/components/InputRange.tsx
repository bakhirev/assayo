import React, { ChangeEvent } from 'react';

import Wrapper, { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/index.module.scss';

interface IUiKitInputRangeProps extends IUiKitWrapperProps {
  value: any;
  min: number,
  max: number,
  placeholder?: string;
  onChange: Function;
}

function UiKitInputRange({
  title,
  description,
  help,
  error,
  className,

  value,
  min,
  max,
  placeholder,
  onChange,
}: IUiKitInputRangeProps) {
  return (
    <Wrapper
      title={title}
      description={description}
      help={help}
      error={error}
      className={className}
    >
      <input
        type="range"
        value={value}
        min={min || 0}
        max={max || 100}
        placeholder={placeholder}
        className={style.ui_kit_common}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (onChange) onChange(event.target.value || '');
        }}
      />
    </Wrapper>
  );
}

UiKitInputRange.defaultProps = {
  placeholder: 'Введите значение',
  min: 0,
  max: 100,
};

export default UiKitInputRange;
