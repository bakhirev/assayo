import React, { ChangeEvent } from 'react';

import Wrapper, { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/index.module.scss';

interface IUiKitSelectProps extends IUiKitWrapperProps {
  value: any;
  placeholder?: string;
  onChange: Function;
}

function UiKitInputString({
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
        type="text"
        value={value}
        placeholder={placeholder}
        className={`${className} ${style.ui_kit_common} }`}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (onChange) onChange(event.target.value);
        }}
      />
    </Wrapper>
  );
}

UiKitInputString.defaultProps = {
  placeholder: 'Введите значение',
};

export default UiKitInputString;
