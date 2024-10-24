import React from 'react';

import {
  getPositionForTimeZone,
  getColorForTimeZone,
  getSizeForTimeZone,
} from '../helpers';

import style from '../styles/index.module.scss';

interface PointProps {
  timezone: string;
  authors: string[];
  maxValue: number;
}

function Point({
  timezone,
  authors,
  maxValue,
}: PointProps): React.ReactElement | null {
  const position = getPositionForTimeZone(timezone);
  const color = getColorForTimeZone(authors);
  const size = getSizeForTimeZone(authors.length, maxValue);
  return (
    <div
      title={authors.join(', ')}
      className={`${style.time_zone_map_point} ${position} ${color} ${size}`}
    >
      {authors.length}
    </div>
  );
}

Point.defaultProps = {
  timezone: '',
  authors: [],
};

export default Point;
