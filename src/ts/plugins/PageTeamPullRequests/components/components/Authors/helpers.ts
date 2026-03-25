import statisticStore from 'ts/store/Statistics';

export function getGroupsByAuthors(list: any[]) {
  const authors = statisticStore.statisticsByCommits.author.totalInfo;
  const worked = authors
    .filter((author: any) => !author.isStaff)
    .map((author: any) => [author.author, []]);
  const groups = new Map(worked);

  list.forEach((item) => {
    const group = groups.get(item.author);
    if (group) { // @ts-ignore
      group.push(item);
    }
  });

  return Array.from(groups.values())
    .filter((item: any) => item.length > 0);
}
