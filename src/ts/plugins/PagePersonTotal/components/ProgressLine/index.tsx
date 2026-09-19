import React from 'react';
import { useTranslation } from 'ts/components/Translation';

import style from './index.module.scss';

interface ProgressLineProps {
  value: number;
  max: number;
  title?: string;
  icon?: string;
}

function ProgressLine({ value, max, title, icon }: ProgressLineProps): React.ReactElement {
  const { t } = useTranslation();
  const width = Math.min(Math.round((value * 100) / max), 100);

  let className = [style.progress_line_value];
  if (width <= 15) className.push(style.progress_line_value_min);
  else if (width <= 25) className.push(style.progress_line_value_less);
  else if (width >= 85) className.push(style.progress_line_value_max);
  else if (width >= 70) className.push(style.progress_line_value_more);

  return (
    <div className={style.progress_line_container}>
      <div className={style.progress_line_icon}>
        <img
          alt=""
          className={style.progress_line_icon_svg}
          src={icon}
        />
      </div>
      <div className={style.progress_line}>
        <div
          className={className.join(' ')}
          style={{ width: `${width}%` }}
        />
      </div>
      <p className={style.progress_line_title}>
        {t(title)}
      </p>
    </div>
  );
}

export default ProgressLine;
