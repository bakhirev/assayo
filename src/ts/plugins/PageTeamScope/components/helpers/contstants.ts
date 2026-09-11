import { RECOMMENDATION_TYPES } from 'ts/helpers/Recommendations/helpers/contstants';

export const RECOMMENDATIONS = {
  money: {
    description: 'plugin.team_scope.recommendations.money',
    type: RECOMMENDATION_TYPES.FACT,
  },
  plan: {
    title: 'plugin.team_scope.recommendations.plan.title',
    description: 'plugin.team_scope.recommendations.plan.description',
    type: RECOMMENDATION_TYPES.INFO,
  },
  cost: {
    title: 'plugin.team_scope.recommendations.cost.title',
    description: 'plugin.team_scope.recommendations.cost.description',
    type: RECOMMENDATION_TYPES.INFO,
  },
  parallelismNot: {
    title: 'plugin.team_scope.recommendations.parallelism.not.title',
    description: 'plugin.team_scope.recommendations.parallelism.not.description',
    type: RECOMMENDATION_TYPES.FACT,
  },
  parallelismHas: {
    title: 'plugin.team_scope.recommendations.parallelism.has.title',
    description: 'plugin.team_scope.recommendations.parallelism.has.description',
    type: RECOMMENDATION_TYPES.FACT,
  },
  parallelismEvery: {
    title: 'plugin.team_scope.recommendations.parallelism.every.title',
    description: 'plugin.team_scope.recommendations.parallelism.every.description',
    type: RECOMMENDATION_TYPES.FACT,
  },
  busEveryHasOne: {
    title: 'plugin.team_scope.recommendations.bus.everyHasOne.title',
    description: 'plugin.team_scope.recommendations.bus.everyHasOne.description',
    type: RECOMMENDATION_TYPES.WARNING,
  },
  busOneMaintainer: {
    description: 'plugin.team_scope.recommendations.bus.oneMaintainer',
    type: RECOMMENDATION_TYPES.ALERT,
  },
  typesProcess: {
    title: 'plugin.team_scope.recommendations.types.process.title',
    description: [
      'plugin.team_scope.recommendations.types.process.description',
      'plugin.team_scope.recommendations.types.common',
    ],
    type: RECOMMENDATION_TYPES.WARNING,
  },
  typesOne: {
    description: [
      'plugin.team_scope.recommendations.types.one',
      'plugin.team_scope.recommendations.types.common',
    ],
    type: RECOMMENDATION_TYPES.WARNING,
  },
};
