import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import isMobile from 'ts/helpers/isMobile';
import globalScroll from 'ts/helpers/globalScroll';

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

  useEffect(globalScroll.useOnOff, []);

  const childrenWithProps = React.Children.map(children, (child) => (React.isValidElement(child)
    ? React.cloneElement(
      child, // @ts-ignore
      { onClose, delay, setCanClose },
    ) : child));

  const customClass = isMobile
    ? style.modal_window_fullscreen
    : style.modal_window;

  return ReactDOM.createPortal((
    <div
      id={`${id}-wrapper`}
      className={`${style.modal_window_wrapper || ''}`}
      onClick={(event: any) => {
        event.stopPropagation();
        if (event.target?.id !== `${id}-wrapper`) return;
        if (onClose && canClose) onClose();
      }}
    >
      <div
        id={id}
        className={`${customClass} ${className || ''}`}
        onClick={(event: any) => {
          event.stopPropagation();
        }}
      >
        {mode === 'halo' ? (
          <img
            className={style.modal_window_halo}
            src="./assets/sponsor/halo.png"
          />
        ) : null}
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
