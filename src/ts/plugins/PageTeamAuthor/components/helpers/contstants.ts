import { RECOMMENDATION_TYPES } from 'ts/helpers/recommendations';

export const RECOMMENDATIONS = {
  lotOfLazy: {
    title: 'plugin.team_author.recommendations.lotOfLazy.title',
    description: 'plugin.team_author.recommendations.lotOfLazy.description',
    type: RECOMMENDATION_TYPES.ALERT,
    arguments: {
      title: '',
      description: '',
    },
  },
  manyLazy: {
    title: 'plugin.team_author.recommendations.manyLazy.title',
    description: 'plugin.team_author.recommendations.manyLazy.description',
    type: RECOMMENDATION_TYPES.WARNING,
    arguments: {
      title: '',
      description: '',
    },
  },
  oneTypeMans: {
    description: 'plugin.team_author.recommendations.oneTypeMans',
    type: RECOMMENDATION_TYPES.WARNING,
  },
  workToday: {
    title: 'plugin.team_author.recommendations.workToday.title',
    description: 'plugin.team_author.recommendations.workToday.description',
    type: RECOMMENDATION_TYPES.FACT,
    arguments: {
      title: '',
      description: '',
    },
  },
  dismissed: {
    title: 'plugin.team_author.recommendations.dismissed.title',
    description: 'plugin.team_author.recommendations.dismissed.description',
    type: RECOMMENDATION_TYPES.FACT,
    arguments: {
      title: '',
      description: '',
    },
  },
  staff: {
    title: 'plugin.team_author.recommendations.staff.title',
    description: 'plugin.team_author.recommendations.staff.description',
    type: RECOMMENDATION_TYPES.FACT,
    arguments: {
      title: '',
      description: '',
    },
  },
  manager: {
    title: 'plugin.team_author.recommendations.manager.title',
    description: 'plugin.team_author.recommendations.manager.description',
    type: RECOMMENDATION_TYPES.INFO,
  },
  shorTalk: {
    title: 'plugin.team_author.recommendations.shorTalk.title',
    description: 'plugin.team_author.recommendations.shorTalk.description',
    type: RECOMMENDATION_TYPES.INFO,
  },
  ipr: {
    title: 'plugin.team_author.recommendations.ipr.title',
    description: 'plugin.team_author.recommendations.ipr.description',
    type: RECOMMENDATION_TYPES.INFO,
  },
  oneToOne: {
    title: 'plugin.team_author.recommendations.oneToOne.title',
    description: 'plugin.team_author.recommendations.oneToOne.description',
    type: RECOMMENDATION_TYPES.INFO,
  },
  club: {
    title: 'plugin.team_author.recommendations.club.title',
    description: 'plugin.team_author.recommendations.club.description',
    type: RECOMMENDATION_TYPES.INFO,
  },
  projectTypeOpenSource: {
    title: 'plugin.team_author.recommendations.projectType.openSource.title',
    description: 'plugin.team_author.recommendations.projectType.openSource.description',
    type: RECOMMENDATION_TYPES.FACT,
  },
  projectTypeEasy: {
    title: 'plugin.team_author.recommendations.projectType.easy.title',
    description: 'plugin.team_author.recommendations.projectType.easy.description',
    type: RECOMMENDATION_TYPES.ALERT,
  },
};
