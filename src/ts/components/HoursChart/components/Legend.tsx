import React from 'react';

import localization from 'ts/helpers/Localization';

import style from '../styles/legend.module.scss';

function Legend(): React.ReactElement | null {
  return (
    <div className={style.legend}>
      <div className={style.legend_item}>
        <div className={style.legend_work}></div>
        <div className={style.legend_title}>
          {localization.get('uiKit.hoursChart.work')}
        </div>
      </div>
      <div className={style.legend_item}>
        <div className={style.legend_weekend}></div>
        <div className={style.legend_title}>
          {localization.get('uiKit.hoursChart.weekend')}
        </div>
      </div>
      <div className={style.legend_item}>
        <div className={style.legend_count}>
          42
        </div>
        <div className={style.legend_title}>
          {localization.get('uiKit.hoursChart.days')}
        </div>
      </div>
    </div>
  );
}

export default Legend;
