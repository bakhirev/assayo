import React from 'react';

import { IUiKitWrapperProps } from './Wrapper';
import style from '../styles/button.module.scss';

export type Mode = 'primary' | 'second'  | 'border' | 'link' | 'slim' | 'full_size';

export function getClassNameForMode(mode?: string) {
  return {
    link: style.ui_kit_button_link,
    slim: style.ui_kit_button_slim,
    second: style.ui_kit_button_second,
    primary: style.ui_kit_button_primary,
    border: style.ui_kit_button_border,
    full_size: style.ui_kit_button_full_size,
  }[mode || ''] || '';
}

export function getCustomClassName(mode?: Mode | Mode[], disabled?: boolean) {
  let customClassName = '';

  if (Array.isArray(mode)) {
    customClassName = mode.map(getClassNameForMode).join(' ');
  } else if (mode) {
    customClassName = getClassNameForMode(mode);
  } else {
    customClassName = getClassNameForMode('primary');
  }

  if (disabled) {
    customClassName += ` ${style.disabled}`;
  }

  return customClassName;
}

interface IUiKitButtonProps extends IUiKitWrapperProps {
  mode?: Mode | Mode[]
  onClick?: Function,
}

function UiKitButton({
  title,
  mode,
  disabled,
  className,
  onClick,
  children,
}: IUiKitButtonProps) {
  const customClassName = getCustomClassName(mode, disabled);

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
