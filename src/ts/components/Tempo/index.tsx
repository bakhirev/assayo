import React, { useEffect, useRef, useState } from 'react';

import Column from './components/Column';
import style from './styles/index.module.scss';

interface ITempoProps {
  days: any[];
  author?: string;
  order?: string[];
}

function Tempo({
  days,
  author,
  order,
}: ITempoProps) {
  const [customStyle, setCustomStyle] = useState<any>({});
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const element = ref?.current;
    if (element?.clientWidth === element?.scrollWidth) {
      setCustomStyle({ overflowX: 'hidden' });
    }
  }, []);

  const columns = days.map((dayInfo: any) => (
    <Column
      key={dayInfo?.timestamp}
      dayInfo={dayInfo}
      author={author}
      order={order || []}
    />
  ));

  return (
    <div
      ref={ref}
      style={customStyle}
      className={`${style.tempo_wrapper} scroll_x`}
      onTouchStart={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className={style.tempo}>
        {columns}
      </div>
    </div>
  );
}

Column.defaultProps = {
  order: [],
  author: '',
};

export default Tempo;
