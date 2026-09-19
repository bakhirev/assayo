import React, { ReactNode, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import If from 'ts/components/Layout/If';
import Locker from './componentns/Locker';

import style from '../../styles/index.module.scss';

interface IHeaderProps {
  delay?: number;
  className?: string;
  onClose?: Function;
  setCanClose?: Function;
  children?: ReactNode;
}

const Header = observer(({
  delay,
  className,
  children,
  onClose,
  setCanClose,
}: IHeaderProps) => {
  const onClick = useCallback((event: any) => {
    event.stopPropagation();
    if (onClose) onClose();
  }, [onClose]);

  return (
    <div className={`${style.modal_window_title} ${className || ''}`}>
      {children}

      <If value={onClose}>
        <img
          alt=""
          src="./assets/close.svg"
          className={style.modal_window_close}
          onClick={onClick}
        />
      </If>

      <If value={delay}>
        <Locker
          delay={delay}
          className={style.modal_window_locker}
          callback={() => {
            if (setCanClose) setCanClose(true);
          }}
        />
      </If>
    </div>
  );
});

export default Header;
