import dataGripStore from 'ts/store/DataGrip';

import style from '../styles/index.module.scss';

const REF_TIMEZONE_CLASS = {
  p1300: style.time_zone_map_point_p1300,
  p1200: style.time_zone_map_point_p1200,
  p1100: style.time_zone_map_point_p1100,
  p1000: style.time_zone_map_point_p1000,
  p1030: style.time_zone_map_point_p1030,
  p0930: style.time_zone_map_point_p0930,
  p0900: style.time_zone_map_point_p0900,
  p0800: style.time_zone_map_point_p0800,
  p0700: style.time_zone_map_point_p0700,
  p0630: style.time_zone_map_point_p0630,
  p0600: style.time_zone_map_point_p0600,
  p0545: style.time_zone_map_point_p0545,
  p0430: style.time_zone_map_point_p0430,
  p0530: style.time_zone_map_point_p0530,
  p0500: style.time_zone_map_point_p0500,
  p0400: style.time_zone_map_point_p0400,
  p0330: style.time_zone_map_point_p0330,
  p0300: style.time_zone_map_point_p0300,
  p0200: style.time_zone_map_point_p0200,
  p0100: style.time_zone_map_point_p0100,
  p0000: style.time_zone_map_point_p0000,
  m0100: style.time_zone_map_point_m0100,
  m0200: style.time_zone_map_point_m0200,
  m0300: style.time_zone_map_point_m0300,
  m0330: style.time_zone_map_point_m0330,
  m0400: style.time_zone_map_point_m0400,
  m0500: style.time_zone_map_point_m0500,
  m0600: style.time_zone_map_point_m0600,
  m0700: style.time_zone_map_point_m0700,
  m0800: style.time_zone_map_point_m0800,
  m0900: style.time_zone_map_point_m0900,
  m1000: style.time_zone_map_point_m1000,
  m1100: style.time_zone_map_point_m1100,
  m1200: style.time_zone_map_point_m1200,
};

export function getGroupsByTimeZone(authors: any[]) {
  return authors.reduce((acc: any, author: any) => {
    const key = author.lastCommit.timezone;
    if (!acc[key]) acc[key] = [];
    acc[key].push(author.author);
    return acc;
  }, {});
}

export function getPositionForTimeZone(timezone?: string) {
  const suffix = (timezone || '')
    .replace('+', 'p')
    .replace('-', 'm')
    .replace(':', '');
  return REF_TIMEZONE_CLASS[suffix] || style.time_zone_map_point_hide;
}

export function getColorForTimeZone(authors: string[]) {
  let isDismissed = false;
  for (let i = 0, l = authors.length; i < l; i++) {
    const item = dataGripStore.dataGrip.author.statisticByName[authors[i]];
    if (item?.isStaff) continue;
    if (!item?.isDismissed) return style.time_zone_map_point_active;
    if (item?.isDismissed) isDismissed = true;
  }
  return isDismissed
    ? style.time_zone_map_point_dismissed
    : '';
}
