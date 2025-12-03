import React from 'react';

import { SectionProps } from '../interfaces';
import style from '../index.module.scss';

function SectionColumn({ children }: SectionProps) {
  return (
    <div className={style.main_wrapper_item}>
      {children}
    </div>
  );
}

export default SectionColumn;
