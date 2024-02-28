import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import UiKitButton from 'ts/components/UiKit/components/Button';

import style from './index.module.scss';

interface IPageColumnProps {
  className?: string;
  onRemove?: Function;
  children: ReactNode | string | null;
}

function PageBox({
  className,
  onRemove,
  children,
}: IPageColumnProps) {
  const { t } = useTranslation();
  return (
    <div className={`${style.main_wrapper_white} ${className || ''}`}>
      <div className={style.main_wrapper_icons}>
        {onRemove && (
          <UiKitButton
            mode="second"
            onClick={() => onRemove()}
          >
            {t('uiKit.page.remove')}
          </UiKitButton>
        )}
      </div>
      {children}
    </div>
  );
}

PageBox.defaultProps = {
  className: undefined,
};

export default PageBox;
