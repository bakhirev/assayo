import React from 'react';

import { SectionProps } from '../interfaces';
import style from '../index.module.scss';

function SectionWithBg({
  children,
  className,
}: SectionProps) {
  return (
    <section
      className={`${style.components_section} ${style.components_section_white} ${className || ''}`}
      style={{ paddingTop: 0 }}
    >
      {children}
    </section>
  );
}

export default SectionWithBg;
