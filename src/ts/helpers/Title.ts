import localization from './Localization';

function getFormattedType(fileGrip: any): string {
  const popularType = fileGrip.extension.statistic?.[0] || {};
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
    const hasManifest = fileGrip.extension.statisticByName?.xml?.files?.AndroidManifest;
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

export default function getTitle(dataGrip: any, fileGrip: any, commits: any) {
  if (!commits.length) {
    return localization.get('common.title');
  }

  const type = getFormattedType(fileGrip) || '';
  const task = dataGrip.pr.statistic?.[0]?.task || '';
  const author = dataGrip.firstLastCommit.minData.author || '';
  const year = commits?.[0]?.year || '';

  const formattedTask = task.split('-').shift().toUpperCase() || '';
  const formattedAuthor = author.split(' ').shift() || '';

  return `${type} ${formattedTask} (${year}, ${formattedAuthor})`;
}
