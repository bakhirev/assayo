import React from 'react';

import { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/index.module.scss';

export function getCustomClassName(type?: string, disabled?: boolean) {
  let customClassName = {
    slim: style.button_slim,
    second: style.button_second,
    primary: style.button_primary,
  }[type || 'primary'] || '';

  if (disabled) {
    customClassName += ` ${style.disabled}`;
  }
  return customClassName;
}

interface IUiKitButtonProps extends IUiKitWrapperProps {
  type?: string,
  onClick: Function,
}

function UiKitButton({
  title,
  type,
  disabled,
  className,
  onClick,
  children,
}: IUiKitButtonProps) {
  const customClassName = getCustomClassName(type, disabled);

  return (
    <button
      title={title}
      className={`${style.button} ${customClassName || ''} ${className || ''}`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}


export default UiKitButton;
