import { useMemo } from 'react';
import { getCustomDate } from 'ts/helpers/formatter';
import localization from 'ts/helpers/Localization';

export function defaultFormatter(type: string, item: any) {
  const scale = 366 / 100;
  return [item?.from / scale, item?.to / scale];
}

const MARKERS_LINE = (new Array(12)).fill(null).map((_, i) => ({
  from: i * 30 + 1,
}));

const MARKERS_TEXT = MARKERS_LINE.map((item, i) => ({
  title: i >= 9 ? `2024-${i + 1}-01` : `2024-0${i + 1}-01`,
  from: item.from,
  to: item.from + 30,
}));

export function useDefaultGanttChartMarker() {
  const markersText = useMemo(() => (
    MARKERS_TEXT.map((item) => ({
      ...item,
      title: getCustomDate(item.title, { month: 'long' }),
    }))
  ), [localization.language]);

  return [markersText, MARKERS_LINE];
}
