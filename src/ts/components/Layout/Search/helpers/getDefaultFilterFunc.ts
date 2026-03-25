import Filter from '../interfaces/Filter';

export default function getDefaultFilterFunc(filters: Filter) {
  return (item: any): boolean => {
    if (filters.author && item.author !== filters.author) return false;
    if (filters.company && item.company !== filters.company) return false;
    if (filters.taskCode && item.taskCode !== filters.taskCode) return false;
    if (filters.scope && item.scope !== filters.scope) return false;
    if (filters.type && item.type !== filters.type) return false;
    return true;
  };
}
