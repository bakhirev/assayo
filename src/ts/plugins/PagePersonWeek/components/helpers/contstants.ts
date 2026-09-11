import { RECOMMENDATION_TYPES } from 'ts/helpers/recommendations';

export const RECOMMENDATIONS = {
  lazyDaysDown: {
    title: 'plugin.person_week.recommendations.lazyDays.down.title',
    description: 'plugin.person_week.recommendations.lazyDays.down.description',
    type: RECOMMENDATION_TYPES.FACT,
  },
  lazyDaysUp: {
    title: 'plugin.person_week.recommendations.lazyDays.up.title',
    description: 'plugin.person_week.recommendations.lazyDays.up.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  notWork: {
    title: 'plugin.person_week.recommendations.notWork.title',
    description: 'plugin.person_week.recommendations.notWork.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  upWork: {
    title: 'plugin.person_week.recommendations.upWork.title',
    description: 'plugin.person_week.recommendations.upWork.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  taskUp: {
    title: 'plugin.person_week.recommendations.task.up.title',
    description: 'plugin.person_week.recommendations.task.up.description',
    type: RECOMMENDATION_TYPES.FACT,
  },
  taskDown: {
    title: 'plugin.person_week.recommendations.task.down.title',
    description: 'plugin.person_week.recommendations.task.down.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
};
