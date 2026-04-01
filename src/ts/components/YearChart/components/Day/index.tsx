import React from 'react';

import { getDate } from 'ts/helpers/formatter';
import { StatisticsDay } from 'ts/helpers/StatisticsByCommits/components/month/day';

import { Filters } from '../../interfaces/Filters';
import { getPercentByMax, getContent, getColor, getColorList } from './helpers';
import { DayEvent } from '../../helpers/events';
import dayInfoStore from '../../store/DayInfo';

import style from '../../styles/index.module.scss';

interface DayProps {
  max: number;
  author?: string;
  dayNumber: number;
  dayInfo: StatisticsDay;
  events?: DayEvent;
  filters: Filters;
}

function Day({
  max,
  author,
  dayNumber,
  events,
  filters,
  dayInfo,
}: DayProps): React.ReactElement | null {
  const commitsNumber = author
    ? dayInfo.commitsNumberByAuthor.get(author)
    : dayInfo.commitsNumber;

  const opacity = getPercentByMax(commitsNumber || 0, max);
  const colorList = getColorList(dayNumber, filters, dayInfo);
  const backgroundColor = getColor(colorList, opacity);

  const title = getDate(dayInfo.timestamp);
  const [suffix, icon] = getContent(filters, events, author);

  return (
    <div
      title={`${title}${suffix}`}
      id={`year_chart_day_${dayInfo?.timestamp}`}
      className={style.year_chart_month_body_day}
      style={{
        backgroundColor,
      }}
      onClick={(event) => {
        dayInfoStore.toggle(dayInfo, [event.pageX, event.pageY]);
      }}
    >
      {icon || ' '}
    </div>
  );
}

Day.defaultProps = {
  rows: [],
};

export default Day;
