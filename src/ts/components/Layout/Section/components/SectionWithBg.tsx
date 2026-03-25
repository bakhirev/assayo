import React from 'react';

import { SectionProps } from '../interfaces';
import style from '../index.module.scss';

function SectionWithBg({
  children,
  className,
}: SectionProps) {
  return (
    <section
      className={`${style.main_wrapper} ${style.main_wrapper_white} ${className || ''}`}
      style={{ paddingTop: 0 }}
    >
      {children}
    </section>
  );
}

export default SectionWithBg;
