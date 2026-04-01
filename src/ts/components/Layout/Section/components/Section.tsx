import React from 'react';

import { SectionProps } from '../interfaces';
import style from '../index.module.scss';

function Section({
  children,
  className,
}: SectionProps) {
  return (
    <section className={`${style.components_section} ${className || ''}`}>
      {children}
    </section>
  );
}

export default Section;
