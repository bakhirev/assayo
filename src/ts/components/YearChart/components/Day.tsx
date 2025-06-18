import React from 'react';

import { getDate } from 'ts/helpers/formatter';
import { DataGripDay } from 'ts/helpers/DataGrip/components/month';

import { Filters } from '../interfaces/Filters';
import { getPercentByMax, getColor, COLORS } from '../helpers/day';
import { DayEvent } from '../helpers/events';
import dayInfoStore from '../store/DayInfo';

import style from '../styles/index.module.scss';

interface DayProps {
  max: number;
  dayNumber: number;
  dayInfo: DataGripDay;
  events?: DayEvent;
  filters: Filters;
}

function DayIcon({ src }: { src: string }) {
  return (
    <img
      className={style.year_chart_month_body_day_icon}
      src={src}
    />
  );
}

function getText(filters: Filters, events?: DayEvent) {
  if (filters.firstLastDays) {
    if (events?.firstDay && !events?.lastDay) {
      return (<DayIcon src="./assets/chart/person_add.svg" />);
    }
    if (!events?.firstDay && events?.lastDay) {
      return (<DayIcon src="./assets/chart/person_remove.svg" />);
    }
    if (events?.firstDay && events?.lastDay) {
      return (<DayIcon src="./assets/chart/person_add_remove.svg" />);
    }
  }
  if (filters.release && events?.release) {
    return (<DayIcon src="./assets/chart/release.svg" />);
  }
  return ' ';
}

function getColorList(dayNumber: number, filters: Filters, dayInfo: DataGripDay) {
  // @ts-ignore
  const author = filters?.authors?.[0]?.title;
  if (author && dayInfo.userCommitNumbers.has(author)) {
    return COLORS.SELECTED;
  }
  // @ts-ignore
  const type = filters?.types?.[0]?.title;
  if (type && dayInfo.typeCommitNumbers.has(type)) {
    return COLORS.SELECTED;
  }
  const weekend = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41];
  if (weekend.includes(dayNumber)) {
    return COLORS.WEEKEND;
  }
  return COLORS.WORKS;
}

function Day({
  max,
  dayNumber,
  events,
  filters,
  dayInfo,
}: DayProps): React.ReactElement | null {
  const opacity = getPercentByMax(dayInfo.commitsNumber, max);
  const colorList = getColorList(dayNumber, filters, dayInfo);
  const backgroundColor = getColor(colorList, opacity);

  const title = getDate(dayInfo.timestamp);
  const text = getText(filters, events);

  return (
    <div
      title={title}
      id={`year_chart_day_${dayInfo?.timestamp}`}
      className={style.year_chart_month_body_day}
      style={{
        backgroundColor,
      }}
      onClick={(event) => {
        dayInfoStore.toggle(dayInfo, [event.pageX, event.pageY]);
      }}
    >
      {text || ' '}
    </div>
  );
}

Day.defaultProps = {
  rows: [],
};

export default Day;
