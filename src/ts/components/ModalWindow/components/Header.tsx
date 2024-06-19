import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import Locker from 'ts/components/Locker';

import style from '../styles/index.module.scss';

interface IHeaderProps {
  id?: string;
  delay?: number;
  className?: string;
  onClose?: Function;
  setCanClose?: Function;
  children?: ReactNode;
}

const Header = observer(({
  id,
  delay,
  className,
  children,
  onClose,
  setCanClose,
}: IHeaderProps) => (
    <div
      id={`${id || ''}-title`}
      className={`${style.modal_window_title} ${className || ''}`}
    >
      {children}

      {onClose ? (
        <img
          id={`${id}-close`}
          src="./assets/close.svg"
          className={style.modal_window_close}
          onClick={(event: any) => {
            event.stopPropagation();
            onClose();
          }}
        />
      ) : null}

      {delay ? (
        <Locker
          delay={delay}
          className={style.modal_window_locker}
          callback={() => {
            if (setCanClose) setCanClose(true);
          }}
        />
      ) : null}
    </div>
));

export default Header;
