import applicationConfig from 'ts/store/ApplicationConfig';

enum TYPE {
  FRONT = 'Frontend',
  IOS = 'IOS',
  ANDROID = 'Android',
  BACK = 'Backend',
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

function getFormattedType(statisticsByFiles: any): string {
  const popularType = statisticsByFiles.extension.totalInfo?.[0] || {};
  const extension = popularType?.extension || '';
  const type = REF_EXTENSION_TYPE[extension];

  if (type === TYPE.ANDROID) {
    const hasManifest = statisticsByFiles.extension.totalInfoByName?.xml?.files?.AndroidManifest;
    return hasManifest
      ? TYPE.ANDROID
      : TYPE.BACK;
  }

  return type || extension.toUpperCase();
}

export default function getTitle(statisticsByCommits: any, statisticsByFiles: any, commits: any) {
  if (!commits.length || applicationConfig.config.title) {
    return applicationConfig.config.title || 'Assayo';
  }

  const type = getFormattedType(statisticsByFiles) || '';
  const task = statisticsByCommits.pr.totalInfo?.[0]?.task || '';
  const from = commits?.[0]?.year || '';
  const to = commits?.[commits.length - 1]?.year || '';

  const taskCode = task.split('-').shift().toUpperCase() || '';

  return `${taskCode} ${type} (${from} - ${to})`;
}
