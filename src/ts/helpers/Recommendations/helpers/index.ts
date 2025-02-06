import { RECOMMENDATIONS_BY_VIEW } from './contstants';

export function getBuilder(type: string) {
  function getItem(id: string) {
    return RECOMMENDATIONS_BY_VIEW[type][id];
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

