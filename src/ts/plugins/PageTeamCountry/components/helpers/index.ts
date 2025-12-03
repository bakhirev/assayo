import { t } from 'ts/helpers/Localization';

import IFilters from '../interfaces/Filters';

export function getOptions(companies: any[]) {
  const options = companies.map((item: any) => ({ id: item.company, title: item.company }));
  return [
    { id: '', title: t('page.common.filter.allUsers') },
    { id: Math.random(), title: 'Unknown' },
    ...options,
  ];
}

export function getDefaultFilters(): IFilters {
  return {
    hash: Math.random(),
    isActive: true,
    isDismissed: true,
    isStaff: true,
    company: '',
  };
}

export function getFilterForAuthors(filters: IFilters) {
  return (author: any) => {
    if (filters.company && author.lastCompany !== filters.company) return false;
    if (!filters.isStaff && author.isStaff) return false;
    if (!filters.isActive && !author.isDismissed && !author.isStaff) return false;
    if (!filters.isDismissed && author.isDismissed && !author.isStaff) return false;
    return true;
  };
}

export function getCountryByAuthors(authors: any[]) {
  const isCorrectAuthor = authors.reduce((acc: any, item: any) => {
    acc.set(item.author, true);
    return acc;
  }, new Map());

  return (item: any) => {
    const employments = item.employments
      .filter((name: string) => isCorrectAuthor.has(name));

    return employments.length
      ? ({ ...item, employments })
      : null;
  };
}
