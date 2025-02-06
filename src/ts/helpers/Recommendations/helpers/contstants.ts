export const RECOMMENDATION_TYPES = {
  ALERT: 'error',
  WARNING: 'warning',
  FACT: 'fact',
  INFO: 'info',
};

export const RECOMMENDATIONS_BY_VIEW = {
  timestamp: {
    weekendDays: {
      title: 'recommendations.timestamp.common.title',
      description: 'recommendations.timestamp.weekendDays.description',
      type: RECOMMENDATION_TYPES.ALERT,
      arguments: {
        title: [],
      },
    },
    lossesDays: {
      title: 'recommendations.timestamp.common.title',
      description: 'recommendations.timestamp.lossesDays.description',
      type: RECOMMENDATION_TYPES.WARNING,
      arguments: {
        title: [],
      },
    },
    allDays: {
      title: 'recommendations.timestamp.common.title',
      description: 'recommendations.timestamp.allDays.description',
      type: RECOMMENDATION_TYPES.FACT,
      arguments: {
        title: [],
      },
    },
    firstCommit: {
      title: '',
      description: 'recommendations.timestamp.firstCommit.description',
      type: RECOMMENDATION_TYPES.FACT,
      arguments: {
        description: [],
      },
    },
    lastCommit: {
      title: '',
      description: 'recommendations.timestamp.lastCommit.description',
      type: RECOMMENDATION_TYPES.FACT,
      arguments: {
        description: [],
      },
    },
    regularWeekendWord: {
      title: 'recommendations.timestamp.regularWeekendWord.title',
      description: 'recommendations.timestamp.weekendWord.description',
      type: RECOMMENDATION_TYPES.ALERT,
    },
    sometimeWeekendWord:{
      title: 'recommendations.timestamp.sometimeWeekendWord.title',
      description: 'recommendations.timestamp.weekendWord.description',
      type: RECOMMENDATION_TYPES.ALERT,
    },
    neverWeekendWord: {
      title: 'recommendations.timestamp.neverWeekendWord.title',
      description: 'recommendations.timestamp.neverWeekendWord.description',
      type: RECOMMENDATION_TYPES.FACT,
    },
  },
  week: {
    lazyDaysDown: {
      title: 'recommendations.week.lazyDays.down.title',
      description: 'recommendations.week.lazyDays.down.description',
      type: RECOMMENDATION_TYPES.FACT,
    },
    lazyDaysUp: {
      title: 'recommendations.week.lazyDays.up.title',
      description: 'recommendations.week.lazyDays.up.description',
      type: RECOMMENDATION_TYPES.ALERT,
    },
    notWork: {
      title: 'recommendations.week.notWork.title',
      description: 'recommendations.week.notWork.description',
      type: RECOMMENDATION_TYPES.ALERT,
    },
    upWork: {
      title: 'recommendations.week.upWork.title',
      description: 'recommendations.week.upWork.description',
      type: RECOMMENDATION_TYPES.ALERT,
    },
    taskUp: {
      title: 'recommendations.week.task.up.title',
      description: 'recommendations.week.task.up.description',
      type: RECOMMENDATION_TYPES.FACT,
    },
    taskDown: {
      title: 'recommendations.week.task.down.title',
      description: 'recommendations.week.task.down.description',
      type: RECOMMENDATION_TYPES.ALERT,
    },
    taskLazyMaintainer: {
      description: 'recommendations.week.task.lazyMaintainer.description',
      type: RECOMMENDATION_TYPES.ALERT,
    },
  },
  type: {
    fewTypes: {
      title: 'recommendations.type.fewTypes.title',
      description: 'recommendations.type.fewTypes.description',
      type: RECOMMENDATION_TYPES.FACT,
    },
    diff: {
      title: 'recommendations.type.diff.title',
      description: 'recommendations.type.diff.description',
      type: RECOMMENDATION_TYPES.INFO,
    },
    buddy: {
      title: 'recommendations.type.buddy.title',
      description: 'recommendations.type.buddy.description',
      type: RECOMMENDATION_TYPES.INFO,
    },
    everyHasOne: {
      title: 'recommendations.type.everyHasOne.title',
      description: [
        'recommendations.type.everyHasOne.description',
        'recommendations.type.common',
      ],
      type: RECOMMENDATION_TYPES.WARNING,
    },
    oneMaintainer: {
      title: 'recommendations.type.oneMaintainer.title',
      description: [
        'recommendations.type.oneMaintainer.description',
        'recommendations.type.common',
      ],
      type: RECOMMENDATION_TYPES.ALERT,
      arguments: {
        description: [],
      },
    },
  },
  scope: {
    money: {
      description: 'recommendations.scope.money',
      type: RECOMMENDATION_TYPES.FACT,
    },
    plan: {
      title: 'recommendations.scope.plan.title',
      description: 'recommendations.scope.plan.description',
      type: RECOMMENDATION_TYPES.INFO,
    },
    cost: {
      title: 'recommendations.scope.cost.title',
      description: 'recommendations.scope.cost.description',
      type: RECOMMENDATION_TYPES.INFO,
    },
    parallelismNot: {
      title: 'recommendations.scope.parallelism.not.title',
      description: 'recommendations.scope.parallelism.not.description',
      type: RECOMMENDATION_TYPES.FACT,
    },
    parallelismHas: {
      title: 'recommendations.scope.parallelism.has.title',
      description: 'recommendations.scope.parallelism.has.description',
      type: RECOMMENDATION_TYPES.FACT,
    },
    parallelismEvery: {
      title: 'recommendations.scope.parallelism.every.title',
      description: 'recommendations.scope.parallelism.every.description',
      type: RECOMMENDATION_TYPES.FACT,
    },
    busEveryHasOne: {
      title: 'recommendations.scope.bus.everyHasOne.title',
      description: 'recommendations.scope.bus.everyHasOne.description',
      type: RECOMMENDATION_TYPES.WARNING,
    },
    busOneMaintainer: {
      description: 'recommendations.scope.bus.oneMaintainer',
      type: RECOMMENDATION_TYPES.ALERT,
    },
    typesProcess: {
      title: 'recommendations.scope.types.process.title',
      description: [
        'recommendations.scope.types.process.description',
        'recommendations.scope.types.common',
      ],
      type: RECOMMENDATION_TYPES.WARNING,
    },
    typesOne: {
      description: [
        'recommendations.scope.types.one',
        'recommendations.scope.types.common',
      ],
      type: RECOMMENDATION_TYPES.WARNING,
    },
  },
  hour: {
    onlyWork: {
      title: 'recommendations.hour.onlyWork.title',
      description: 'recommendations.hour.onlyWork.description',
      type: RECOMMENDATION_TYPES.ALERT,
    },
    weekends: {
      title: 'recommendations.hour.weekends.title',
      description: 'recommendations.hour.weekends.description',
      type: RECOMMENDATION_TYPES.ALERT,
    },
    easy: {
      title: 'recommendations.hour.easy.title',
      description: 'recommendations.hour.easy.description',
      type: RECOMMENDATION_TYPES.WARNING,
    },
  },
  author: {
    lotOfLazy: {
      title: 'recommendations.author.lotOfLazy.title',
      description: 'recommendations.author.lotOfLazy.description',
      type: RECOMMENDATION_TYPES.ALERT,
      arguments: {
        title: '',
        description: '',
      },
    },
    manyLazy: {
      title: 'recommendations.author.manyLazy.title',
      description: 'recommendations.author.manyLazy.description',
      type: RECOMMENDATION_TYPES.WARNING,
      arguments: {
        title: '',
        description: '',
      },
    },
    oneTypeMans: {
      description: 'recommendations.author.oneTypeMans',
      type: RECOMMENDATION_TYPES.WARNING,
    },
    workToday: {
      title: 'recommendations.author.workToday.title',
      description: 'recommendations.author.workToday.description',
      type: RECOMMENDATION_TYPES.FACT,
      arguments: {
        title: '',
        description: '',
      },
    },
    dismissed: {
      title: 'recommendations.author.dismissed.title',
      description: 'recommendations.author.dismissed.description',
      type: RECOMMENDATION_TYPES.FACT,
      arguments: {
        title: '',
        description: '',
      },
    },
    staff: {
      title: 'recommendations.author.staff.title',
      description: 'recommendations.author.staff.description',
      type: RECOMMENDATION_TYPES.FACT,
      arguments: {
        title: '',
        description: '',
      },
    },
    manager: {
      title: 'recommendations.author.manager.title',
      description: 'recommendations.author.manager.description',
      type: RECOMMENDATION_TYPES.INFO,
    },
    shorTalk: {
      title: 'recommendations.author.shorTalk.title',
      description: 'recommendations.author.shorTalk.description',
      type: RECOMMENDATION_TYPES.INFO,
    },
    ipr: {
      title: 'recommendations.author.ipr.title',
      description: 'recommendations.author.ipr.description',
      type: RECOMMENDATION_TYPES.INFO,
    },
    oneToOne: {
      title: 'recommendations.author.oneToOne.title',
      description: 'recommendations.author.oneToOne.description',
      type: RECOMMENDATION_TYPES.INFO,
    },
    club: {
      title: 'recommendations.author.club.title',
      description: 'recommendations.author.club.description',
      type: RECOMMENDATION_TYPES.INFO,
    },
    projectTypeOpenSource: {
      title: 'recommendations.author.projectType.openSource.title',
      description: 'recommendations.author.projectType.openSource.description',
      type: RECOMMENDATION_TYPES.FACT,
    },
    projectTypeEasy: {
      title: 'recommendations.author.projectType.easy.title',
      description: 'recommendations.author.projectType.easy.description',
      type: RECOMMENDATION_TYPES.ALERT,
    },
  },
};
