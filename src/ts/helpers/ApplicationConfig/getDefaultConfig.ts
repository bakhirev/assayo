import ApplicationConfig from 'ts/interfaces/ApplicationConfig';

export default function getDefaultConfig(): ApplicationConfig {
  return {
    title: '',
    logo: './assets/logo.svg',

    language: '',
    languages: [
      { id: 'ar', currency: 'AED', title: 'العَرَبِيَّة' },
      { id: 'de', currency: 'EUR', title: 'Deutsch' },
      { id: 'en', currency: 'USD', title: 'English' },
      { id: 'es', currency: 'EUR', title: 'Español' },
      { id: 'fr', currency: 'EUR', title: 'Français' },
      { id: 'he', currency: 'ILS', title: 'עברית' },
      { id: 'hi', currency: 'INR', title: 'हिंदी' },
      { id: 'ja', currency: 'JPY', title: '日本語' },
      { id: 'ko', currency: 'KRW', title: '한국어' },
      { id: 'pt', currency: 'EUR', title: 'Português' },
      { id: 'ru', currency: 'RUB', title: 'Русский' },
      { id: 'zh', currency: 'CNY', title: '中文' },
    ],
    ref: '',

    urlForCss: '',
    urlForGitLog: '',

    prefixForTask: 'https://jira.com/secure/RapidBoard.jspa?task=',
    prefixForPR: 'https://bitbucket.com/projects/assayo/repos/frontend/pull-requests/',

    middleSalaryInMonth: 3000,
    workDays: [true, true, true, true, true, false, false],
    currency: 'RUB',
    exchangeRate: {
      USD: 1,
      EUR: 0.9,
      RUB: 82,
      CNY: 7,
      JPY: 160,
      KRW: 1500,
      CAD: 1.4,
      INR: 92,
      ILS: 3.1,
      AED: 3.6,
    },

    permissions: [],
    disabledPermissions: [],

    plugins: [
      // 'person_changes',
      'person_achievements',
      // 'person_commits',
      'person_money',
      'person_vacation',
      'person_speed',
      'person_total',
      'person_week',

      'team_author',
      'team_building',
      // 'team_changes',
      'team_commits',
      'team_companies',
      'team_country',
      'team_vacation',
      'team_day',
      'team_departments',
      'team_file_analytics',
      'team_files',
      'team_hours',
      'team_month',
      'team_pull_requests',
      'team_recommendations',
      'team_refactor',
      'team_release',
      'team_scope',
      'team_emails',
      'team_tasks',
      'team_total',
      'team_types',
      'team_weeks',

      'print',
      'sponsor',
      'settings',
    ],
    disabledPlugins: [],
  };
}

