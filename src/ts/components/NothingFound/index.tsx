import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import CommitFormat from './components/CommitFormat';
import style from './index.module.scss';

interface INothingFoundProps {
  emptyIcon?: boolean;
  icon?: string | null | undefined;
  message?: string | null | undefined;
  className?: string | null | undefined;
  children?: ReactNode;
}

function NothingFound({
  icon,
  message,
  children,
  className,
}: INothingFoundProps) {
  const { t } = useTranslation();
  const formattedMessage = t(message || '');
  return (
    <div className={`${style.nothing_found_wrapper} ${className}`}>
      <div className={style.nothing_found}>
        <img
          src={icon || './assets/cards/nothing_found.png'}
          className={style.nothing_found_icon}
        />
        {!children && message && (
          <p className={style.nothing_found_title}>
            {formattedMessage}
          </p>
        )}
        {!children && !message && (<CommitFormat />)}
        {children}
      </div>
    </div>
  );
}

NothingFound.defaultProps = {
  children: null,
  icon: null,
  className: '',
  message: '',
  stylesConfig: { iconWidth: '483px', iconHeight: '332px', margin: '0' },
};

export default NothingFound;
