import React from 'react';

import { SectionProps } from '../interfaces';
import style from '../index.module.scss';

function SectionColumn({ children }: SectionProps) {
  return (
    <div className={style.components_section_column}>
      {children}
    </div>
  );
}

export default SectionColumn;
