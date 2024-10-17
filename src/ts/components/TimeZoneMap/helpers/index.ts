export function getGroupsByTimeZone(authors: any[]) {
  return authors.reduce((acc: any, author: any) => {
    const key = author.lastCommit.timezone;
    if (!acc[key]) acc[key] = [];
    acc[key].push(author.author);
    return acc;
  }, {});
}

export function getClassNameForTimeZone(timezone?: string) {
  const suffix = (timezone || '')
    .replace('+', 'p')
    .replace('-', 'm')
    .replace(':', '');
  return `time_zone_map_point_${suffix || 'hide'}`;
}
