export function getPositionInPercent(year?: number) {
  return (type: string, dot: any) => {
    const scale = 366 / 100;

    if (type === 'marker') {
      return dot.to
        ? [Math.floor(dot.from / scale), Math.floor(dot.to / scale)]
        : [Math.floor(dot.from / scale)];
    }

    let from = dot.from.month * 30 + dot.from.dayInMonth;
    let to = dot.to.month * 30 + dot.to.dayInMonth;

    if (dot.from.year !== dot.to.year) {
      if (dot.from.year === year) {
        to = 365;
      } else {
        from = 0;
      }
    }

    return [
      Math.floor(from / scale),
      Math.floor(to / scale),
    ];
  };
}


function getDefaultMonthInfo(
  year: number,
) {
  return {
    year,
    lines: [],
  };
}

export function getGroupsByYear(content: any[]) {
  const years = new Map();
  (content || []).forEach((release: any) => {
    let id = release.from.year;
    let info = years.get(id) || getDefaultMonthInfo(id);
    info.lines.push(release);
    years.set(id, info);

    if (release.from.year === release.to.year) return;
    id = release.to.year;
    info = years.get(id) || getDefaultMonthInfo(id);
    info.lines.push(release);
    years.set(id, info);
  });

  return Array.from(years.values())
    .sort((a: any, b: any) => b.year - a.year);
}
