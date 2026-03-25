import type Filter from 'ts/components/Layout/Search/interfaces/Filter';
import statisticStore from 'ts/store/Statistics';

export function getDefaultFilters(): Filter {
  return {
    isActive: true,
    isDismissed: true,
    isStaff: true,
  };
}

export function getOnFilter(filters: Filter) {
  const companyByName = statisticStore.statisticsByCommits.company.totalInfoByName;
  const authorsByCompany = companyByName[filters.company || '']?.authors || [];
  const refCompanyAuthors = new Set(authorsByCompany.map((item: any) => item.author));

  const taskCodeByName = statisticStore.statisticsByCommits.taskCodes.totalInfoByName;
  const authorsByTaskCodes = taskCodeByName[filters.taskCode || '']?.authors || [];
  const refTaskCodeAuthors = new Set(authorsByTaskCodes.map((item: any) => item.author));

  return (item: any): boolean => {
    if (filters.author && item.author !== filters.author) return false;
    if (!filters.isStaff && item.isStaff) return false;
    if (!filters.isActive && !item.isDismissed && !item.isStaff) return false;
    if (!filters.isDismissed && item.isDismissed && !item.isStaff) return false;
    if (filters.company && !refCompanyAuthors.has(item.author)) return false;
    if (filters.taskCode && !refTaskCodeAuthors.has(item.author)) return false;
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
