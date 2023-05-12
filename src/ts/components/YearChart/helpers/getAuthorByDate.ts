import IHashMap from 'ts/interfaces/HashMap';

export default function getAuthorByDate(authors: any[]) {
  const firstDay: IHashMap<any> = {};
  const lastDay: IHashMap<any> = {};

  authors.forEach((author: any) => {
    if (author.isStaff) return;

    const firstKey = `${author.firstCommit.month}-${author.firstCommit.year}`;
    if (!firstDay[firstKey]) firstDay[firstKey] = {};
    firstDay[firstKey][author.firstCommit.dayInMonth] = author;

    const lastKey = `${author.lastCommit.month}-${author.lastCommit.year}`;
    if (!lastDay[lastKey]) lastDay[lastKey] = {};
    lastDay[lastKey][author.lastCommit.dayInMonth] = author;
  });

  return { firstDay, lastDay };
}
