import statisticStore from 'ts/store/StatisticsByCommitsStore';
import IHashMap from 'ts/interfaces/HashMap';

export { RECOMMENDATION_TYPES } from './contstants';

export function getWrapperWithCache(callback: Function) {
  let hash = 0;
  let cache: any = [];
  return () => {
    if (hash === statisticStore.hash) return cache;
    hash = statisticStore.hash;
    cache = callback();
    return cache;
  }
}

export function getBuilder(RECOMMENDATIONS: IHashMap<any>) {
  function getItem(id: string) {
    return RECOMMENDATIONS[id];
  }

  function getTitle(id: string, title: any) {
    return { ...getItem(id), title };
  }

  function getArgTitle(id: string, title?: any) {
    return {
      ...getItem(id),
      arguments: {
        title,
      },
    };
  }

  function getArgDescription(id: string, description?: any) {
    return {
      ...getItem(id),
      arguments: {
        description,
      },
    };
  }

  function getTitleArgDescription(id: string, title: string, description?: any) {
    return {
      ...getTitle(id, title),
      arguments: {
        description,
      },
    };
  }

  function getArgTitleDescription(id: string, title: any, description?: any) {
    return {
      ...getItem(id),
      arguments: {
        title,
        description,
      },
    };
  }

  return {
    getItem,
    getTitle,
    getArgTitle,
    getArgDescription,
    getTitleArgDescription,
    getArgTitleDescription,
  };
}

