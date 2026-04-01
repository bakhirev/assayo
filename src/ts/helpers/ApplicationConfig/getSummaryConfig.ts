import IHashMap from 'ts/interfaces/HashMap';
import ApplicationConfig from 'ts/interfaces/ApplicationConfig';

import getDefaultConfig from './getDefaultConfig';

function getNotEmptyArray(list: string[]) {
  return Array.isArray(list) && list?.length ? list : undefined;
}

export default function getSummaryConfig(
  parameters: IHashMap<any> = {},
  configFromBackend: IHashMap<any> = {},
): ApplicationConfig {
  const defaultConfig = getDefaultConfig();

  return {
    title: decodeURIComponent(parameters?.title || '')
      || configFromBackend?.title
      || defaultConfig?.title
      || '',

    logo: configFromBackend?.logo
      || defaultConfig?.logo
      || '',

    ref: parameters?.ref
      || configFromBackend?.ref
      || defaultConfig?.ref
      || '',

    language: parameters?.lang
      || parameters?.language
      || configFromBackend?.language
      || defaultConfig?.language
      || '',
    languages: configFromBackend?.languages
      || defaultConfig?.languages
      || [],

    prefixForTask: configFromBackend?.prefixForTask
      || defaultConfig?.prefixForTask
      || '',
    prefixForPR: configFromBackend?.prefixForPR
      || defaultConfig?.prefixForPR
      || '',

    middleSalaryInMonth: configFromBackend?.middleSalaryInMonth
      || defaultConfig?.middleSalaryInMonth
      || 0,
    workDays: configFromBackend?.workDays
      || defaultConfig?.workDays,
    currency: configFromBackend?.currency
      || defaultConfig?.currency,
    exchangeRate: configFromBackend?.exchangeRate
      || defaultConfig?.exchangeRate
      || {},

    urlForCss: parameters?.style
      || parameters?.theme
      || configFromBackend?.urlForCss
      || defaultConfig?.urlForCss
      || '',

    urlForGitLog: parameters?.dump
      || parameters?.log
      || configFromBackend?.urlForGitLog
      || defaultConfig?.urlForGitLog
      || '',

    permissions: getNotEmptyArray(configFromBackend?.permissions)
      || getNotEmptyArray(defaultConfig?.permissions)
      || [],
    disabledPermissions: getNotEmptyArray(configFromBackend?.disabledPermissions)
      || getNotEmptyArray(defaultConfig?.disabledPermissions)
      || [],

    plugins: getNotEmptyArray(configFromBackend?.plugins)
      || getNotEmptyArray(defaultConfig?.plugins)
      || [],
    disabledPlugins: getNotEmptyArray(configFromBackend?.disabledPlugins)
      || getNotEmptyArray(defaultConfig?.disabledPlugins)
      || [],
  };
}
