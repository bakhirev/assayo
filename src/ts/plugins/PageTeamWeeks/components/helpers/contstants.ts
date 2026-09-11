import { RECOMMENDATION_TYPES } from 'ts/helpers/recommendations';

export const RECOMMENDATIONS = {
  lazyDaysDown: {
    title: 'plugin.team_weeks.recommendations.lazyDays.down.title',
    description: 'plugin.team_weeks.recommendations.lazyDays.down.description',
    type: RECOMMENDATION_TYPES.FACT,
  },
  lazyDaysUp: {
    title: 'plugin.team_weeks.recommendations.lazyDays.up.title',
    description: 'plugin.team_weeks.recommendations.lazyDays.up.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  notWork: {
    title: 'plugin.team_weeks.recommendations.notWork.title',
    description: 'plugin.team_weeks.recommendations.notWork.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  upWork: {
    title: 'plugin.team_weeks.recommendations.upWork.title',
    description: 'plugin.team_weeks.recommendations.upWork.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  taskUp: {
    title: 'plugin.team_weeks.recommendations.task.up.title',
    description: 'plugin.team_weeks.recommendations.task.up.description',
    type: RECOMMENDATION_TYPES.FACT,
  },
  taskDown: {
    title: 'plugin.team_weeks.recommendations.task.down.title',
    description: 'plugin.team_weeks.recommendations.task.down.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  taskLazyMaintainer: {
    description: 'plugin.team_weeks.recommendations.task.lazyMaintainer.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
};
