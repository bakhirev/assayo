import React, { useState } from 'react';

import { IUiKitWrapperProps } from './Wrapper';
import { getCustomClassName } from './Button';

import style from '../styles/index.module.scss';

interface IUiKitButtonMenuProps extends IUiKitWrapperProps {
  type?: string,
  options?: any[],
  onClick: Function,
}

function UiKitButtonMenu({
  title,
  type,
  disabled,
  className,

  options,
  onClick,
  children,
}: IUiKitButtonMenuProps) {
  if (!options?.length) return null;

  const [isOpen, setOpen] = useState<boolean>(false);
  const customClassName = getCustomClassName(type, disabled);
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
        className={`${style.button} ${customClassName || ''} ${className || ''}`}
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
