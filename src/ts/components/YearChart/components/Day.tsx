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

function getTextFromSet(list: any) {
  return Array.from(list).join(', ');
}

function getContent(filters: Filters, events?: DayEvent) {
  let image = '';
  let title = '';

  if (filters.absence) {
    if (events?.vacationStart) {
      image = 'vacation_start';
      title = getTextFromSet(events?.vacationStart);
    }
    if (events?.vacationEnd) {
      image = 'vacation_end';
      title = getTextFromSet(events?.vacationEnd);
    }
    if (events?.travel) {
      image = 'travel';
      title = getTextFromSet(events?.travel);
    }
  }

  if (filters.release && events?.release) {
    image = 'release';
    title = getTextFromSet(events?.release);
  }

  if (filters.firstLastDays) {
    if (events?.firstDay && !events?.lastDay) {
      image = 'person_add';
      title = getTextFromSet(events?.firstDay);
    }
    if (!events?.firstDay && events?.lastDay) {
      image = 'person_remove';
      title = getTextFromSet(events?.lastDay);
    }
    if (events?.firstDay && events?.lastDay) {
      image = 'person_add_remove';
      title = getTextFromSet(events?.firstDay);
    }
  }

  const icon = image ? (
    <img
      className={style.year_chart_month_body_day_icon}
      src={`./assets/chart/${image}.svg`}
    />
  ) : null;

  title = title ? ` | ${title}` : title;

  return [title, icon];
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
  const [suffix, icon] = getContent(filters, events);

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
