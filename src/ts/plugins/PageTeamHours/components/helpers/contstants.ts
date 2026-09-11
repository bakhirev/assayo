import { RECOMMENDATION_TYPES } from 'ts/helpers/recommendations';

export const RECOMMENDATIONS = {
  onlyWork: {
    title: 'plugin.team_hours.recommendations.onlyWork.title',
    description: 'plugin.team_hours.recommendations.onlyWork.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  weekends: {
    title: 'plugin.team_hours.recommendations.weekends.title',
    description: 'plugin.team_hours.recommendations.weekends.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  easy: {
    title: 'plugin.team_hours.recommendations.easy.title',
    description: 'plugin.team_hours.recommendations.easy.description',
    type: RECOMMENDATION_TYPES.WARNING,
  },
};
