import React, { useLayoutEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { IOptions, ISubLine } from 'ts/components/LineChart/interfaces';
import isMobile from 'ts/helpers/isMobile';

import style from '../index.module.scss';

function getColumnCount(parts: ISubLine[], element?: HTMLElement | null) {
  if (!element || isMobile || parts.length <= 7) return 1;
  // @ts-ignore
  const width = element?.parentNode?.getBoundingClientRect()?.width || 0;
  const countByWidth = Math.floor(width / 300) || 1;
  const countByLength = Math.round(parts.length / 8);
  console.log(countByWidth, countByLength);
  return Math.min(countByLength, countByWidth);
}

interface ILegendProps {
  parts: ISubLine[];
  options: IOptions;
}

function Legend({
  parts,
  options,
}: ILegendProps): React.ReactElement | null {
  const { t } = useTranslation();
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [columnCount, setColumnCount] = useState<number>(1);

  useLayoutEffect(() => {
    setColumnCount(getColumnCount(parts, ref?.current));
  }, [ref, ref.current]);

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
    <div
      ref={ref}
      className={style.pie_chart_legend}
      style={{ columnCount }}
    >
      {lines}
    </div>
  );
}

export default Legend;
