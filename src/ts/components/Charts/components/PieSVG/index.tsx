import React from 'react';
import { useTranslation } from 'react-i18next';

import { ISubLine } from '../../interfaces';
import { getSegmentPath } from './helpers';
import style from './index.module.scss';

interface IPieSVGProps {
  parts: ISubLine[];
  suffix?: string;
  color?: any;
  center?: number;
}

const ROTATE = -90;

function PieSVG({
  parts,
  center,
  color,
  suffix,
}: IPieSVGProps): React.ReactElement | null {
  const { t } = useTranslation();
  const centerRadius = 49 * ((center || 72) / 100);
  const formattedSuffix = suffix ? t(suffix) : '';

  let prev = 0;
  const paths = parts.map((item: ISubLine) => {
    const fill = color.get(item.title).first;
    const angle = 360 * item.width / 100;
    const formattedAngle = angle === 360 ? 359.9 : angle;
    const next = Math.min(prev + formattedAngle, 360);
    const d = getSegmentPath(50, 50, centerRadius, 50, prev + ROTATE, next + ROTATE);
    prev += angle;

    const formattedValue = item.value && formattedSuffix
      ? ` (${item.value || ''} ${formattedSuffix})`
      : '';

    return (
      <path
        key={item.title}
        style={{ fill }}
        d={d}
        className={style.pie_svg_sector}
      >
        <title>
          {`${t(item.title)}${formattedValue}`}
        </title>
      </path>
    );
  });

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className={style.pie_svg}
    >
      {paths}
    </svg>
  );
}

PieSVG.defaultProps = {
  className: '',
};

export default PieSVG;
