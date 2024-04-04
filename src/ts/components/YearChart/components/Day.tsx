import React, { useState } from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import dataGripStore from 'ts/store/DataGrip';
import DayInfo from 'ts/components/DayInfo';
import Title from 'ts/components/Title';

import { getDate } from 'ts/helpers/formatter';

import IMonth from '../interfaces/Month';
import style from '../styles/index.module.scss';

import {
  getPercentByMax,
  getColor,
  getIconUrl, getDayText,
} from '../helpers/day';

interface IDayProps {
  maxCommits: number;
  dayNumber: any;
  month: IMonth;
  dayInfo: any;
  events: IHashMap<any>;
}

function Day({
  month,
  dayInfo,
  maxCommits,
  dayNumber,
  events,
}: IDayProps): React.ReactElement | null {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const weekend = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41];
  const opacity = getPercentByMax(dayInfo.commits, maxCommits);
  const isWeekend = weekend.includes(dayNumber);
  const backgroundColor = getColor(isWeekend, opacity);
  const iconUrl = getIconUrl(month, dayInfo.dayInMonth);
  const text = getDayText(events, dayInfo.timestamp);

  return ( // @ts-ignore
    <div
      className={style.year_chart_month_body_day}
      title={`commits: ${dayInfo.commits}, tasks: ${dayInfo.tasksInDay || 0}`}
      style={{
        backgroundColor,
        backgroundImage: iconUrl ? `url(${iconUrl})` : '',
      }}
      onClick={() => {
        setShowInfo(!showInfo);
      }}
    >
      {showInfo ? (
        <>
          {'◉'}
          <div className={style.year_chart_month_body_day_arrow} />
          <div className={`${style.year_chart_month_body_day_info} scroll_y`}>
            <Title title={getDate(dayInfo.timestamp)} />
            <DayInfo // @ts-ignore
              day={dayInfo}
              events={events}
              timestamp={dayInfo.timestamp}
              order={dataGripStore.dataGrip.author.list}
            />
          </div>
        </>
      ) : text}
    </div>
  );
}

Day.defaultProps = {
  rows: [],
};

export default Day;
