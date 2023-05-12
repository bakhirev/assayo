import React from 'react';

import style from '../styles/legend.module.scss';

function Legend(): React.ReactElement | null {
  return (
    <div className={style.legend}>
      <div className={style.legend_item}>
        <div className={style.legend_work}></div>
        <div className={style.legend_title}>
          стандартное рабочее время (будни, с 07:00 до 20:00)
        </div>
      </div>
      <div className={style.legend_item}>
        <div className={style.legend_weekend}></div>
        <div className={style.legend_title}>
          выходные дни или время до/после рабочего дня
        </div>
      </div>
      <div className={style.legend_item}>
        <div className={style.legend_count}>
          42
        </div>
        <div className={style.legend_title}>
          суммарное количество коммитов за все время в конкретный день и час
        </div>
      </div>
    </div>
  );
}

export default Legend;
