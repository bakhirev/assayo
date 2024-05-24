import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import Wrapper, { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/index.module.scss';

interface IUiKitSelectProps extends IUiKitWrapperProps {
  value: any;
  placeholder?: string;
  onChange: Function;
}

function UiKitInputNumber({
  title,
  description,
  help,
  error,
  className,

  disabled,
  value,
  placeholder,
  onChange,
}: IUiKitSelectProps) {
  const { t } = useTranslation();
  return (
    <Wrapper
      title={title}
      description={description}
      help={help}
      error={error}
      className={className}
    >
      <input
        disabled={disabled}
        type="number"
        value={value}
        placeholder={placeholder ? t(placeholder) : ''}
        className={style.ui_kit_common}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (onChange) onChange(parseInt(event.target.value, 10) || 0);
        }}
      />
    </Wrapper>
  );
}

UiKitInputNumber.defaultProps = {
  placeholder: 'Введите значение',
};

export default UiKitInputNumber;
