import type Filter from 'ts/components/Layout/Search/interfaces/Filter';
import statisticStore from 'ts/store/Statistics';

function getStatus(filter: string, value: number, limit: number) {
  if (!filter) return true;
  if (!value) return false;
  return value >= limit;
}

export function isFiltersMatches(fileOrFolder: any, filters?: Filter): boolean {
  const limit = filters?.minCommits || 0;

  let status = fileOrFolder.commits >= limit;
  if (status) {
    const authorCommits = fileOrFolder.authors?.[filters?.author];
    status = getStatus(filters?.author, authorCommits, limit);
  }
  if (status) {
    const companyCommits = fileOrFolder.companies?.[filters?.company];
    status = getStatus(filters?.company, companyCommits, limit);
  }
  if (status) {
    const taskCodeCommits = fileOrFolder.taskCode?.[filters?.taskCode];
    status = getStatus(filters?.taskCode, taskCodeCommits, limit);
  }
  if (status) {
    const typeCommits = fileOrFolder.types?.[filters?.type];
    status = getStatus(filters?.type, typeCommits, limit);
  }
  if (status) {
    const scopeCommits = fileOrFolder.scope?.[filters?.scope];
    status = getStatus(filters?.scope, scopeCommits, limit);
  }

  return status;
}

export function getFilteredTasks(tasks: any[], filters?: Filter) {
  const taskByName = statisticStore.statisticsByCommits.tasks.totalInfoByName;
  return [...(tasks || [])]
    .reverse()
    .map((taskId: any) => taskByName.get(taskId))
    .filter((task) => {
      if (!task) return false;
      if (!filters) return true;
      if (filters.author && !task.authors.has(filters.author)) return false;
      // if (filters.company && item.company !== filters.company) return false;
      if (filters.taskCode && task.taskCode !== filters.taskCode) return false;
      if (filters.scope && !task.scope.includes(filters.scope)) return false;
      if (filters.type && !task.types.includes(filters.type)) return false;
      return true;
    });
}
