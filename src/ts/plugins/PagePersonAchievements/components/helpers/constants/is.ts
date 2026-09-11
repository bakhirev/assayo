function getHashMap(list: string[]) {
  return new Map(list.map((code: string) => [code, true]));
}

export const IS_LINT_HINT = getHashMap([
  '.eslintrc',
  '.stylelintrc.json',
]);

export const IS_DOC = getHashMap([
  'md',
  'doc',
  'docx',
  'txt',
]);

export const IS_CSS = getHashMap([
  'css',
  'scss',
  'less',
  'style',
]);

export const IS_CSS_NAME = getHashMap([
  'style',
  'styles',
]);

export const IS_ACHIEVEMENT_SITNIK = getHashMap([
  'browserslist-stats.json',
  '.browserslistrc',
  'postcss.config.js',
  'postcss.config.ts',
]);

export const IS_TEST = getHashMap([
  'test',
  'mock',
  'snap',
]);

export const IS_CI_CD = getHashMap([
  'Dockerfile',
  'gradlew',
  'gradlew.bat',
  'gradle.properties',
  'docker-compose.yml',
]);
