import React, { ReactNode } from 'react';

import UiKitButton from 'ts/components/UiKit/components/Button';
import localization from 'ts/helpers/Localization';

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
  return (
    <div className={`${style.main_wrapper_white} ${className || ''}`}>
      <div className={style.main_wrapper_icons}>
        {onRemove && (
          <UiKitButton
            type="second"
            onClick={() => onRemove()}
          >
            {localization.get('uiKit.page.remove')}
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
