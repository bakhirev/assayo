import React from 'react';

import { getClassNameForTimeZone } from '../helpers';

import style from '../styles/index.module.scss';

interface PointProps {
  timezone: string;
  authors: string[]
}

function Point({
  timezone,
  authors,
}: PointProps): React.ReactElement | null {
  const className = getClassNameForTimeZone(timezone);
  return (
    <div
      title={authors.join(', ')}
      className={`${style.time_zone_map_point} ${className}`}
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
