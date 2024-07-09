import React, { ReactNode } from 'react';

import Button from 'ts/components/UiKit/components/Button';
import notificationsStore from 'ts/components/Notifications/store';
import { t } from 'ts/helpers/Localization';
import copyInBuffer from 'ts/helpers/copyInBuffer';

import style from './index.module.scss';

interface IConsoleProps {
  textForCopy?: string;
  className?: string;
  children?: ReactNode | string | number | null;
}

function Console({ className, textForCopy, children }: IConsoleProps) {
  return (
    <div className={`${style.console} ${className || ''}`}>
      <div className={`${style.console_header}`}>
        <span className={`${style.console_header_icon}`}></span>
        <span className={`${style.console_header_icon}`}></span>
        <span className={`${style.console_header_icon}`}></span>
      </div>
      <div className={`${style.console_body}`}>
        {children || textForCopy}
      </div>
      {textForCopy ? (
        <Button
          mode="second"
          className={`${style.console_copy}`}
          onClick={() => {
            copyInBuffer(textForCopy);
            notificationsStore.show(t('uiKit.console.notification'));
          }}
        >
          {t('uiKit.console.button')}
        </Button>
      ) : null}
    </div>
  );
}

Console.defaultProps = {
  textForCopy: undefined,
  children: undefined,
  className: '',
};

export default Console;
