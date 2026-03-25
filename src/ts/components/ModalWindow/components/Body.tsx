import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import style from '../styles/index.module.scss';

interface IBodyProps {
  className?: string,
  children?: ReactNode;
}

const Body = observer(({
  className,
  children,
}: IBodyProps) => (
  <div className={`${style.modal_window_body} scroll_y ${className || ''}`}>
    {children}
  </div>
));

export default Body;
