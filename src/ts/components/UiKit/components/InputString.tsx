import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'ts/components/Translation';

import Wrapper, { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/index.module.scss';

interface IUiKitSelectProps extends IUiKitWrapperProps {
  value: any;
  placeholder?: string;
  debounceDelay?: number;
  onChange?: Function;
  onChangeDebounce?: Function;
}

function UiKitInputString({
  title,
  description,
  help,
  error,
  example,
  className,

  value,
  placeholder,
  debounceDelay,
  onChange,
  onChangeDebounce,
}: IUiKitSelectProps) {
  const { text } = useTranslation();
  const commonChange = useCallback((() => {
    let timer: any = null;
    return function (event: ChangeEvent<HTMLInputElement>) {
      const newValue = event.target.value;
      if (onChange) {
        onChange(newValue);
      }
      if (onChangeDebounce) {
        clearTimeout(timer);
        timer = setTimeout(() => onChangeDebounce(newValue), debounceDelay || 800);
      }
    };
  })(), [onChange]);

  return (
    <Wrapper
      title={title}
      description={description}
      help={help}
      error={error}
      example={example}
      className={className}
    >
      <input
        type="text"
        value={value}
        placeholder={placeholder ? text(placeholder) : ''}
        className={`${className} ${style.ui_kit_common}`}
        onChange={commonChange}
      />
    </Wrapper>
  );
}

UiKitInputString.defaultProps = {
  placeholder: 'Введите значение',
};

export default UiKitInputString;
