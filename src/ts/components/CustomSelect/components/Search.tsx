import React, { useEffect, useRef, useState } from 'react';

import { CLOSE_DELAY } from '../helpers/constants';
import style from '../styles/index.module.scss';

function getKeyCode(key?: string): string {
  return {
    ArrowUp: 'up',
    ArrowDown: 'down',
    Enter: 'enter',
  }[key || ''] || '';
}

interface UiKitSelectSearchProps {
  value: string;
  placeholder?: string;
  className?: string;
  onClose: Function;
  onChange: Function;
  onKeyDown: Function;
}

function UiKitSelectSearch({
  value,
  placeholder,
  className,
  onChange,
  onClose,
  onKeyDown,
}: UiKitSelectSearchProps) {
  const ref = useRef(null);
  const [timer, setTimer] = useState<any>(0);

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      if (ref?.current) ref.current.focus();
    }, CLOSE_DELAY);
  }, []);

  return (
    <input
      ref={ref}
      type="text"
      value={value}
      placeholder={placeholder}
      className={`${style.ui_kit_select_search} ${className || ''}`}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer);
        onChange(event.target.value);
      }}
      onBlur={() => {
        clearTimeout(timer);
        const timerId = setTimeout(() => {
          onClose();
        }, CLOSE_DELAY);
        setTimer(timerId);
      }}
      onFocus={() => {
        clearTimeout(timer);
      }}
      onKeyDown={() => {
        // onKeyDown(getKeyCode(event.key));
      }}
      onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown(getKeyCode(event.key));
        // onKeyDown('');
      }}
    />
  );
}


export default UiKitSelectSearch;
