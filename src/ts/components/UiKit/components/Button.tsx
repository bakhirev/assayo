import React from 'react';

import { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/index.module.scss';

export function getCustomClassName(type?: string, disabled?: boolean) {
  let customClassName = {
    slim: style.ui_kit_button_slim,
    second: style.ui_kit_button_second,
    primary: style.ui_kit_button_primary,
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
      className={`${style.ui_kit_button} ${customClassName || ''} ${className || ''}`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}


export default UiKitButton;
