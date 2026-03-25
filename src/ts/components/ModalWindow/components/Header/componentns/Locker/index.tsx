import React, { useEffect, useState } from 'react';

import style from './index.module.scss';

interface ILockerProps {
  delay: number;
  callback?: Function;
  className?: string;
  sectorClassName?: string;
  borderClassName?: string;
}

function Locker({
  delay,
  callback,
  className,
  sectorClassName,
  borderClassName,
}: ILockerProps): React.ReactElement | null {
  const [dash, setDash] = useState<string>('');
  const [value, setValue] = useState<number>(delay);

  useEffect(() => {
    const percent = Math.round(100 - (value * 100 / delay));
    const strokeLength = Math.PI * 49.5;
    const newDash = (strokeLength / 100) * percent;
    setDash(`${newDash}, ${strokeLength}`);

    if (percent >= 99) {
      if (callback) callback();
      return;
    }

    setTimeout(() => {
      setValue((next: number) => next - 1);
    }, 1000);
  }, [value]);

  if (!delay || !value) return null;

  return (
    <div className={`${style.locker} ${className || ''}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className={style.locker_icon}
      >
        <circle
          r="25"
          cx="50"
          cy="50"
          style={{ strokeDasharray: dash }}
          className={`${style.locker_sector} ${sectorClassName || ''}`}
        />
        <circle
          r="49.5"
          cx="50"
          cy="50"
          className={`${style.locker_border} ${borderClassName || ''}`}
        />
        <circle
          r="40"
          cx="50"
          cy="50"
          className={`${style.locker_center} ${borderClassName || ''}`}
        />
      </svg>
      <p className={style.locker_text}>
        {value}
      </p>
    </div>
  );
}

Locker.defaultProps = {
  delay: 60,
  callback: undefined,
  className: '',
  sectorClassName: '',
  borderClassName: '',
};

export default Locker;
