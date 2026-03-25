import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import style from '../styles/index.module.scss';

interface IFooterProps {
  className?: string,
  children?: ReactNode;
}

const Footer = observer(({
  className,
  children,
}: IFooterProps) => (
  <div className={`${style.modal_window_footer} ${className || ''}`}>
    {children}
  </div>
));

export default Footer;
