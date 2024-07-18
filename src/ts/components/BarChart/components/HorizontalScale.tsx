import React, { useEffect, useState } from 'react';

import style from '../styles/scale.module.scss';

interface HorizontalScaleProps {
  max: number;
  onChange: Function;
}

function HorizontalScale({
  max,
  onChange,
}: HorizontalScaleProps): React.ReactElement | null {
  const [timer, setTimer] = useState<any>(null);
  const [range, setRange] = useState<number>(max);

  useEffect(() => {
    setRange(max);
    onChange(max);
  }, [max]);

  return (
    <div className={style.vertical_bar_scale_wrapper}>
      <input
        type="range"
        min={1}
        max={max}
        value={range}
        className={style.vertical_bar_scale}
        onChange={(event: any) => {
          const value = parseInt(event.target.value || '0', 10) || 0;
          setRange(value);

          clearTimeout(timer);
          setTimer(setTimeout(() => {
            onChange(value);
          }, 300));
        }}
      />
    </div>
  );
}

export default HorizontalScale;
