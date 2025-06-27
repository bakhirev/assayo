import React from 'react';

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
