import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import style from './index.module.scss';

interface ITitleProps {
  id?: string;
  title: string;
  addPadding?: boolean;
  className?: string;
}

function Title({
  id,
  title,
  addPadding,
  className,
}: ITitleProps) {
  const { t } = useTranslation();
  return (
    <>
      <a // @ts-ignore
        name={title}></a>
      <h3
        id={id || ''}
        className={`${style.title} ${addPadding ? style.title_padding : ''} ${className || ''}`}
      >
        {t(title || '')}
      </h3>
    </>
  );
}

Title.defaultProps = {
  addPadding: false,
  className: '',
};

export default Title;
