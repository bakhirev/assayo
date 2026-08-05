import React from 'react';

import { DayEvent } from '../../../helpers/events';
import { Filters } from '../../../interfaces/Filters';

import style from '../../../styles/index.module.scss';

function getTextFromSet(list: any) {
  return Array.from(list).join(', ');
}
function isTrue(list?: Set<string>, value?: string) {
  if (!list) return false;
  return value ? list.has(value) : list;
}

export function getContent(
  filters: Filters,
  events?: DayEvent,
  author?: string,
) {
  let image = '';
  let title = '';

  if (filters.absence) {
    if (isTrue(events?.vacationStart, author)) {
      image = 'vacation_start';
      title = getTextFromSet(events?.vacationStart);
    }
    if (isTrue(events?.vacationEnd, author)) {
      image = 'vacation_end';
      title = getTextFromSet(events?.vacationEnd);
    }
    if (isTrue(events?.travel, author)) {
      image = 'travel';
      title = getTextFromSet(events?.travel);
    }
  }

  if (filters.release && events?.release) {
    image = 'release';
    title = getTextFromSet(events?.release);
  }

  if (filters.firstLastDays) {
    if (isTrue(events?.firstDay, author) && !isTrue(events?.lastDay, author)) {
      image = 'person_add';
      title = getTextFromSet(events?.firstDay);
    }
    if (!isTrue(events?.firstDay, author) && isTrue(events?.lastDay, author)) {
      image = 'person_remove';
      title = getTextFromSet(events?.lastDay);
    }
    if (isTrue(events?.firstDay, author) && isTrue(events?.lastDay, author)) {
      image = 'person_add_remove';
      title = getTextFromSet(events?.firstDay);
    }
  }

  const icon = image ? (
    <img
      alt=""
      className={style.year_chart_month_body_day_icon}
      src={`./assets/chart/${image}.svg`}
    />
  ) : null;

  title = title ? ` | ${title}` : title;

  return [title, icon];
}
