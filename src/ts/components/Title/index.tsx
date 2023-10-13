import React from 'react';

import localization from 'ts/helpers/Localization';

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
  return (
    <h3 className={`${style.title} ${addPadding ? style.title_padding : ''} ${className || ''}`}>
      {localization.get(title || '')}
    </h3>
  );
}

Title.defaultProps = {
  addPadding: false,
  className: '',
};

export default Title;
