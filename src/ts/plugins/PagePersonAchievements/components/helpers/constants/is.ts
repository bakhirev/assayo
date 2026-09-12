export const IS_LINT_HINT = new Set([
  '.eslintrc',
  '.stylelintrc.json',
]);

export const IS_DOC = new Set([
  'md',
  'doc',
  'docx',
  'txt',
]);

export const IS_CSS = new Set([
  'css',
  'scss',
  'less',
  'style',
]);

export const IS_CSS_NAME = new Set([
  'style',
  'styles',
]);

export const IS_ACHIEVEMENT_SITNIK = new Set([
  'browserslist-stats.json',
  '.browserslistrc',
  'postcss.config.js',
  'postcss.config.ts',
]);

export const IS_TEST = new Set([
  'test',
  'mock',
  'snap',
]);

export const IS_CI_CD = new Set([
  'Dockerfile',
  'gradlew',
  'gradlew.bat',
  'gradle.properties',
  'docker-compose.yml',
]);
