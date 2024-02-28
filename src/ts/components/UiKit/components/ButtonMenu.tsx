import React, { useState } from 'react';

import { IUiKitWrapperProps } from './Wrapper';
import { getCustomClassName, Mode } from './Button';

import style from '../styles/button.module.scss';

interface IUiKitButtonMenuProps extends IUiKitWrapperProps {
  mode?: Mode | Mode[],
  options?: any[],
  onClick: Function,
}

function UiKitButtonMenu({
  title,
  mode,
  disabled,
  className,

  options,
  onClick,
  children,
}: IUiKitButtonMenuProps) {
  if (!options?.length) return null;

  const [isOpen, setOpen] = useState<boolean>(false);
  const customClassName = getCustomClassName(mode, disabled);
  const buttons = options?.map((option: any) => {
    const buttonTitle = option?.title ?? option?.id ??  option ?? '';
    return (
      <button
        key={title}
        className={style.ui_kit_button_menu}
        onClick={() => {
          if (onClick) onClick(option);
          setOpen(false);
        }}
      >
        {buttonTitle}
      </button>
    );
  });

  return (
    <>
      <button
        title={title}
        className={`${style.ui_kit_button} ${customClassName || ''} ${className || ''}`}
        style={{ position: 'relative' }}
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {children}
        {isOpen && (
          <div className={style.ui_kit_dialog}>
            {buttons}
          </div>
        )}
      </button>
    </>
  );
}


export default UiKitButtonMenu;
