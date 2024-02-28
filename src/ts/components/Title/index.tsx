import React from 'react';
import { useTranslation } from 'react-i18next';

import style from './index.module.scss';

interface ITitleProps {
  title: string;
  addPadding?: boolean;
  className?: string;
}

function Title({
  title,
  addPadding,
  className,
}: ITitleProps) {
  const { t } = useTranslation();
  return (
    <>
      <a // @ts-ignore
        name={title}></a>
      <h3 className={`${style.title} ${addPadding ? style.title_padding : ''} ${className || ''}`}>
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
