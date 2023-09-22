import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import style from '../styles/index.module.scss';

interface IHeaderProps {
  id?: string,
  className?: string,
  onClose?: Function,
  children?: ReactNode;
}

const Header = observer(({
  id,
  className,
  children,
  onClose,
}: IHeaderProps) => (
    <div
      id={`${id || ''}-title`}
      className={`${style.modal_window_title} ${className || ''}`}
    >
      {children}
      {onClose ? (
        <img
          id={`${id}-close`}
          className={`${style.modal_window_close} ${className || ''}`}
          onClick={(event: any) => {
            event.stopPropagation();
            onClose();
          }}
        />
      ) : null}
    </div>
));

export default Header;
