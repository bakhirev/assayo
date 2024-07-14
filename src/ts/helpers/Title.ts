import { t } from './Localization';

enum TYPE {
  FRONT = 'Front',
  IOS = 'IOS',
  ANDROID = 'Android',
  BACK = 'Back',
  CONFIG = 'Config',
  DESIGN = 'Design',
}

const REF_EXTENSION_TYPE = {
  js: TYPE.FRONT,
  ts: TYPE.FRONT,
  tsx: TYPE.FRONT,
  vue: TYPE.FRONT,
  css: TYPE.FRONT,
  less: TYPE.FRONT,
  scss: TYPE.FRONT,
  cjs: TYPE.FRONT,
  html: TYPE.FRONT,
  jsp: TYPE.FRONT,

  swift: TYPE.IOS,

  kt: TYPE.ANDROID,
  java: TYPE.ANDROID,

  php: TYPE.BACK,
  perl: TYPE.BACK,
  py: TYPE.BACK,
  rb: TYPE.BACK,
  c: TYPE.BACK,
  h: TYPE.BACK,

  xml: TYPE.CONFIG,
  json: TYPE.CONFIG,
  yml: TYPE.CONFIG,

  csv: TYPE.DESIGN,
  png: TYPE.DESIGN,
  jpg: TYPE.DESIGN,
  jpeg: TYPE.DESIGN,
  gif: TYPE.DESIGN,
  webp: TYPE.DESIGN,
};

function getFormattedType(fileGrip: any): string {
  const popularType = fileGrip.extension.statistic?.[0] || {};
  const extension = popularType?.extension || '';
  const type = REF_EXTENSION_TYPE[extension];

  if (type === TYPE.ANDROID) {
    const hasManifest = fileGrip.extension.statisticByName?.xml?.files?.AndroidManifest;
    return hasManifest
      ? TYPE.ANDROID
      : TYPE.BACK;
  }

  return type || extension.toUpperCase();
}

export default function getTitle(dataGrip: any, fileGrip: any, commits: any) {
  if (!commits.length) {
    return t('common.title');
  }

  const type = getFormattedType(fileGrip) || '';
  const task = dataGrip.pr.statistic?.[0]?.task || '';
  const author = dataGrip.firstLastCommit.minData.author || '';
  const year = commits?.[0]?.year || '';

  const formattedTask = task.split('-').shift().toUpperCase() || '';
  const formattedAuthor = author.split(' ').shift() || '';

  return `${type} ${formattedTask} (${year}, ${formattedAuthor})`;
}
