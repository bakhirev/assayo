import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react-lite';

import { getDate } from 'ts/helpers/formatter';
import { DayInfo, Description, Title } from 'ts/components/Layout';

import type { DayEvents, DayEvent } from '../helpers/events';
import dayInfoStore from '../store/DayInfo';
import style from '../styles/day_info.module.scss';

function getRelease(event?: DayEvent) {
  if (!event?.release) return '';
  const releases = Array
    .from(event?.release || [])
    .sort()
    .join(', ');
  return ` Release: ${releases}`;
}

interface DayInfoHintProps {
  events: DayEvents;
}

const DayInfoHint = observer(({
  events,
}: DayInfoHintProps): React.ReactElement | null => {
  if (!dayInfoStore.info) return null;

  const top = dayInfoStore.position?.[1] + 24;
  const left = dayInfoStore.position?.[0] - 150;
  const event = events.get(dayInfoStore.info.timestamp);
  const release = getRelease(event);

  return ReactDOM.createPortal((
    <div
      className={style.year_chart_day_info}
      style={{
        top,
        left,
      }}
    >
      <div className={`${style.year_chart_day_info_body} scroll_y`}>
        <Title
          title={getDate(dayInfoStore.info.timestamp)}
          className={style.year_chart_day_info_title}
        />

        {release ? (
          <Description
            text={release}
            className={style.year_chart_day_info_title}
          />
        ) : null}

        <DayInfo
          timestamp={dayInfoStore.info.timestamp}
          events={event}
        />
      </div>
    </div>
  ), document.body);
});

export default DayInfoHint;
