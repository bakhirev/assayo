import React from 'react';
import { useTranslation } from 'react-i18next';

import { IOptions, ISubLine } from 'ts/components/LineChart/interfaces';

import style from '../index.module.scss';

interface ILegendProps {
  parts: ISubLine[];
  options: IOptions;
}

function Legend({
  parts,
  options,
}: ILegendProps): React.ReactElement | null {
  const { t } = useTranslation();

  const lines = parts.map((item: ISubLine) => {
    return (
      <p
        key={item.title}
        className={style.pie_chart_line}
      >
        <span
          className={style.pie_chart_color}
          style={{ backgroundColor: options.color.get(item.title).first }}
        />
        <span className={style.pie_chart_percent}>
          {`${item.width}%`}
        </span>
        <span className={style.pie_chart_text}>
          {t(item.title)}
        </span>
      </p>
    );
  });

  return (
    <div className={style.pie_chart_legend}>
      {lines}
    </div>
  );
}

export default Legend;
