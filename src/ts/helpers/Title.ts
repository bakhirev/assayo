function getFormattedType(dataGrip: any): string {
  const popularType = dataGrip.extension.statistic?.[0] || {};
  const extension = popularType?.extension || '';

  if ([
    'js',
    'ts',
    'tsx',
    'vue',
    'css',
    'less',
    'scss',
    'cjs',
    'html',
  ].includes(extension)) {
    return 'Front';
  }

  if ([
    'swift',
  ].includes(extension)) {
    return 'IOS';
  }

  if ([
    'kt',
    'php',
    'perl',
    'java',
  ].includes(extension)) {
    const hasManifest = dataGrip.extension.statisticByName?.xml?.files?.AndroidManifest;
    return hasManifest
      ? 'Android'
      : 'Back';
  }

  if ([
    'xml',
  ].includes(extension)) {
    return 'Config';
  }

  return extension.toUpperCase();
}

export default function getTitle(dataGrip: any, commits: any) {
  if (!commits.length) {
    return 'Git статистика';
  }

  const type = getFormattedType(dataGrip) || '';
  const task = dataGrip.pr.statistic?.[0]?.task || '';
  const author = dataGrip.firstLastCommit.minData.author || '';
  const year = commits?.[0]?.year || '';

  const formattedTask = task.split('-').shift().toUpperCase() || '';
  const formattedAuthor = author.split(' ').shift() || '';

  return `${type} ${formattedTask} (${year}, ${formattedAuthor})`;
}