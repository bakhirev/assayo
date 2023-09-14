import React, { ReactNode } from 'react';

import style from '../styles/index.module.scss';

export interface IUiKitWrapperProps {
  title?: string;
  description?: string;
  help?: string;
  example?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  children?: ReactNode | string | null;
}

function UiKitWrapper({
  title,
  description,
  help,
  example,
  error,
  className,
  children,
}: IUiKitWrapperProps) {
  return (
    <div
      className={`${style.wrapper} ${className || ''}`}
      title={help}
    >
      {title && (
        <h6 className={style.title}>
          {title}
        </h6>
      )}
      {description && (
        <p className={style.description}>
          {description}
        </p>
      )}
      {children}
      {help && (
        <p className={style.help}>
          {example}
        </p>
      )}
      {error && (
        <p className={style.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export default UiKitWrapper;
