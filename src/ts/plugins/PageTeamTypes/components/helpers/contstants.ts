import { RECOMMENDATION_TYPES } from 'ts/helpers/recommendations';

export const RECOMMENDATIONS = {
  fewTypes: {
    title: 'plugin.team_types.recommendations.fewTypes.title',
    description: 'plugin.team_types.recommendations.fewTypes.description',
    type: RECOMMENDATION_TYPES.FACT,
  },
  diff: {
    title: 'plugin.team_types.recommendations.diff.title',
    description: 'plugin.team_types.recommendations.diff.description',
    type: RECOMMENDATION_TYPES.INFO,
  },
  buddy: {
    title: 'plugin.team_types.recommendations.buddy.title',
    description: 'plugin.team_types.recommendations.buddy.description',
    type: RECOMMENDATION_TYPES.INFO,
  },
  everyHasOne: {
    title: 'plugin.team_types.recommendations.everyHasOne.title',
    description: [
      'plugin.team_types.recommendations.everyHasOne.description',
      'plugin.team_types.recommendations.common',
    ],
    type: RECOMMENDATION_TYPES.WARNING,
  },
  oneMaintainer: {
    title: 'plugin.team_types.recommendations.oneMaintainer.title',
    description: [
      'plugin.team_types.recommendations.oneMaintainer.description',
      'plugin.team_types.recommendations.common',
    ],
    type: RECOMMENDATION_TYPES.ALERT,
    arguments: {
      description: {},
    },
  },
};
