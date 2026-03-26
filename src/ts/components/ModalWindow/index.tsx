import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import isMobile from 'ts/helpers/isMobile';
import { globalScroll } from 'ts/helpers/DOMEvents';

import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import style from './styles/index.module.scss';

interface IModalProps {
  id?: string,
  delay?: number;
  mode?: string | string[],
  className?: string,
  onClose?: Function,
  children?: ReactNode;
}

function Modal({
  id,
  mode,
  delay,
  className,
  onClose,
  children,
}: IModalProps) {
  const [canClose, setCanClose] = useState<boolean>(!delay);
  const formattedId = id || 'modal_window';

  useEffect(globalScroll.useOnOff, []);

  const childrenWithProps = React.Children.map(children, (child) => (React.isValidElement(child)
    ? React.cloneElement(
      child, // @ts-ignore
      { onClose, delay, setCanClose },
    ) : child));

  let customClass = style.modal_window;
  if (mode === 'big') customClass = style.modal_window_big;
  if (isMobile) customClass = style.modal_window_fullscreen;

  return ReactDOM.createPortal((
    <div
      id={`${formattedId}-wrapper`}
      className={`${style.modal_window_wrapper || ''}`}
      onClick={(event: any) => {
        event.stopPropagation();
        if (event.target?.id !== `${formattedId}-wrapper`) return;
        if (onClose && canClose) onClose();
      }}
    >
      <div
        id={formattedId}
        className={`${customClass} ${className || ''}`}
        onClick={(event: any) => {
          event.stopPropagation();
        }}
      >
        {childrenWithProps}
      </div>
    </div>
  ), document.body);
}

Modal.displayName = 'Modal';

Modal.defaultProps = {
  id: 'modal-window',
  delay: undefined,
  className: '',
  onClose: undefined,
  children: undefined,
};

export {
  Modal,
  Header,
  Body,
  Footer,
};
