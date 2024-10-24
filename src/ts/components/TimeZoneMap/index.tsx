import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import { getGroupsByTimeZone } from './helpers';
import Point from './components/Point';
import style from './styles/index.module.scss';
import { getMaxByLength } from 'ts/pages/Common/helpers/getMax';

interface TimeZoneMapProps {
  authors: any[]
}

function TimeZoneMap({
  authors = [],
}: TimeZoneMapProps): React.ReactElement | null {
  const groups = getGroupsByTimeZone(authors);
  const content = Object.entries(groups);
  const max = getMaxByLength({ content } as IPagination<any>, '1');
  const points = content.map((item: any) => (
    <Point
      key={item[0]}
      timezone={item[0]}
      authors={item[1]}
      maxValue={max}
    />
  ));

  return (
    <div className={style.time_zone_map}>
      <img
        src="./assets/map/2x1.png"
        className={style.time_zone_map_gap}
      />
      <div
        style={{ backgroundImage: 'url(./assets/map/map.png)' }}
        className={style.time_zone_map_points}
      >
        {points}
      </div>
    </div>
  );
}

export default TimeZoneMap;
