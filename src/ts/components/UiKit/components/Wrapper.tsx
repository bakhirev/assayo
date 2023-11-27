import React, { ReactNode } from 'react';

import localization from 'ts/helpers/Localization';
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
      className={`${style.ui_kit_wrapper} ${className || ''}`}
      title={localization.get(help)}
    >
      {title && (
        <h6 className={style.ui_kit_title}>
          {localization.get(title)}
        </h6>
      )}
      {description && (
        <p className={style.ui_kit_description}>
          {localization.get(description)}
        </p>
      )}
      {children}
      {help && (
        <p className={style.ui_kit_help}>
          {localization.get(example)}
        </p>
      )}
      {error && (
        <p className={style.ui_kit_error}>
          {error}
        </p>
      )}
    </div>
  );
}

export default UiKitWrapper;
