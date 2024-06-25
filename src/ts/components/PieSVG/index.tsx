import React from 'react';

import { IOptions, ISubLine } from 'ts/components/LineChart/interfaces';
import { getSegmentPath } from './helpers';
import style from './index.module.scss';

interface IPieSVGProps {
  options: IOptions;
  parts: ISubLine[];
  center?: number;
}

const ROTATE = -90;

function PieSVG({
  options,
  parts,
  center,
}: IPieSVGProps): React.ReactElement | null {
  const centerRadius = 49 * ((center || 72) / 100);

  let prev = 0;
  const paths = parts.map((item: ISubLine) => {
    const fill = options.color.get(item.title).first;
    const angle = 360 * item.width / 100;
    const next = Math.min(prev + angle, 360);
    const d = getSegmentPath(50, 50, centerRadius, 50, prev + ROTATE, next + ROTATE);
    prev += angle;

    return (
      <path
        key={item.title}
        style={{ fill }}
        d={d}
        className={style.pie_svg_sector}
      >
        <title>
          {`${item.title} ${item.description || ''}`}
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
