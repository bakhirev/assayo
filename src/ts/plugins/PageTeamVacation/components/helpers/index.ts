import { AbsencesByYear } from '../interfaces/AbsencesByYear';

function getDefaultMonthInfo(
  id: string | number,
  year: number,
  author: string,
): AbsencesByYear {
  return {
    id,
    year,
    author,
    lines: [],
  };
}

export function getGroupsAbsencesByYearAuthor(absences?: any[]): AbsencesByYear[] {
  const years = new Map();
  (absences || []).forEach((absence: any) => {
    let id = `${absence.from.year}-${absence.author}`;
    let info = years.get(id) || getDefaultMonthInfo(id, absence.from.year, absence.author);
    info.lines.push(absence);
    years.set(id, info);

    if (absence.from.year === absence.to.year) return;
    id = `${absence.to.year}-${absence.author}`;
    info = years.get(id) || getDefaultMonthInfo(id, absence.to.year, absence.author);
    info.lines.push(absence);
    years.set(id, info);
  });

  return Array.from(years.values());
}

export function getGroupsByYear(groupsAbsencesByYearAuthor: any[]) {
  const groups = new Map();
  groupsAbsencesByYearAuthor.forEach((absence: AbsencesByYear) => {
    const item = groups.get(absence.year) || { year: absence.year, rows: [] };
    item.rows.push(absence);
    groups.set(absence.year, item);
  });

  const list = Array.from(groups.values()).sort((a, b) => b.year - a.year);
  list.forEach((item) => {
    item.rows.sort((a: any, b: any) => a.author.localeCompare(b.author));
  });

  return list;
}

export function getPositionInPercent(year?: number) {
  return (type: string, dot: any) => {
    const scale = 366 / 100;

    if (type === 'marker') {
      return dot.to
        ? [Math.floor(dot.from / scale), Math.floor(dot.to / scale)]
        : [Math.floor(dot.from / scale)];
    }

    let from = dot.from.month * 30 + dot.from.day;
    let to = dot.to.month * 30 + dot.to.day;

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
