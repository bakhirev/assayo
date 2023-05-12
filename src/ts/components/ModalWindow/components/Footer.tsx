import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import style from '../styles/index.module.scss';

interface IFooterProps {
  id?: string,
  className?: string,
  children?: ReactNode;
}

const Footer = observer(({
  id,
  className,
  children,
}: IFooterProps) => (
  <div
    id={`${id || ''}-footer`}
    className={`${style.modal_window_footer} ${className || ''}`}
  >
    {children}
  </div>
));

export default Footer;
