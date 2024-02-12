import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import style from '../styles/index.module.scss';

interface IBodyProps {
  id?: string,
  className?: string,
  children?: ReactNode;
}

const Body = observer(({
  id,
  className,
  children,
}: IBodyProps) => (
  <div
    id={`${id || ''}-body`}
    className={`${style.modal_window_body} scroll_y ${className || ''}`}
  >
    {children}
  </div>
));

export default Body;
