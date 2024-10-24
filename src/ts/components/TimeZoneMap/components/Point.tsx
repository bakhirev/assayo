import React from 'react';

import { getPositionForTimeZone, getColorForTimeZone } from '../helpers';

import style from '../styles/index.module.scss';

interface PointProps {
  timezone: string;
  authors: string[]
}

function Point({
  timezone,
  authors,
}: PointProps): React.ReactElement | null {
  const position = getPositionForTimeZone(timezone);
  const color = getColorForTimeZone(authors);
  return (
    <div
      title={authors.join(', ')}
      className={`${style.time_zone_map_point} ${position} ${color}`}
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
