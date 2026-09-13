import { RECOMMENDATION_TYPES } from 'ts/helpers/recommendations';

export const RECOMMENDATIONS = {
  weekendDays: {
    title: 'plugin.team_month.recommendations.common.title',
    description: 'plugin.team_month.recommendations.weekendDays.description',
    type: RECOMMENDATION_TYPES.ALERT,
    arguments: {
      title: {},
    },
  },
  lossesDays: {
    title: 'plugin.team_month.recommendations.common.title',
    description: 'plugin.team_month.recommendations.lossesDays.description',
    type: RECOMMENDATION_TYPES.WARNING,
    arguments: {
      title: {},
    },
  },
  allDays: {
    title: 'plugin.team_month.recommendations.common.title',
    description: 'plugin.team_month.recommendations.allDays.description',
    type: RECOMMENDATION_TYPES.FACT,
    arguments: {
      title: {},
    },
  },
  firstCommit: {
    title: '',
    description: 'plugin.team_month.recommendations.firstCommit.description',
    type: RECOMMENDATION_TYPES.FACT,
    arguments: {
      description: {},
    },
  },
  lastCommit: {
    title: '',
    description: 'plugin.team_month.recommendations.lastCommit.description',
    type: RECOMMENDATION_TYPES.FACT,
    arguments: {
      description: {},
    },
  },
  regularWeekendWord: {
    title: 'plugin.team_month.recommendations.regularWeekendWord.title',
    description: 'plugin.team_month.recommendations.weekendWord.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  sometimeWeekendWord:{
    title: 'plugin.team_month.recommendations.sometimeWeekendWord.title',
    description: 'plugin.team_month.recommendations.weekendWord.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  neverWeekendWord: {
    title: 'plugin.team_month.recommendations.neverWeekendWord.title',
    description: 'plugin.team_month.recommendations.neverWeekendWord.description',
    type: RECOMMENDATION_TYPES.FACT,
  },
};
