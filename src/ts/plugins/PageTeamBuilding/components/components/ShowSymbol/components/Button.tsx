import React, { ReactNode } from 'react';

import style from '../styles/index.module.scss';

interface IButtonProps {
  children: ReactNode;
  onClick: Function;
  mode?: string;
}

function Button({
  children,
  onClick,
  mode,
}: IButtonProps): React.ReactElement | null {
  const classNameMode = {
    'table-row': style.show_symbol_s,
  }[mode || ''] || '';

  return (
    <div
      className={`${style.show_symbol} ${style.show_symbol_hide} ${classNameMode}`}
      onClick={() => onClick()}
    >
      {children}
    </div>
  );
}


export default Button;
