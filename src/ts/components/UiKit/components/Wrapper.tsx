import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import style from '../styles/wrapper.module.scss';

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
  const { t } = useTranslation();
  return (
    <div
      className={`${style.ui_kit_wrapper} ${className || ''}`}
      title={t(help || '')}
    >
      {title && (
        <h6 className={style.ui_kit_title}>
          {t(title)}
        </h6>
      )}
      {description && (
        <p className={style.ui_kit_description}>
          {t(description)}
        </p>
      )}
      {children}
      {help && (
        <p className={style.ui_kit_help}>
          {t(example || '')}
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
