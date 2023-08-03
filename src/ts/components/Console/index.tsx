import React, { ReactNode } from 'react';

import style from './index.module.scss';

interface IConsoleProps {
  className?: string;
  children?: ReactNode;
}

function Console({ className, children }: IConsoleProps) {
  return (
    <div className={`${style.console} ${className || ''}`}>
      <div className={`${style.console_header}`}>
        <span className={`${style.console_header_icon}`}></span>
        <span className={`${style.console_header_icon}`}></span>
        <span className={`${style.console_header_icon}`}></span>
      </div>
      <div className={`${style.console_body}`}>
        {children}
      </div>
      <button className={`${style.console_copy}`}>
        Копировать
      </button>
    </div>
  );
}

Console.defaultProps = {
  children: undefined,
  className: '',
};

export default Console;
