import React, { ReactNode } from 'react';

import style from './Box.module.scss';

interface IBoxProps {
  children: ReactNode | string | null;
}

function Box({ children }: IBoxProps) {
  return (
    <div className={style.settings_box}>
      {children}
    </div>
  );
}

export default Box;
