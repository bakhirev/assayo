import { IPaginationRequest } from 'ts/interfaces/Pagination';
import ISort from 'ts/interfaces/Sort';

function getSortedContent(content: any[], sortRules: ISort[]) {
  function getResultForString(a: any, b: any, property: string): number {
    return (a[property] || '').localeCompare(b[property] || '');
  }
  function getResultForNumber(a: any, b: any, property: string): number {
    return (a[property] || 0) - (b[property] || 0);
  }
  function getResultForArray(a: any, b: any, property: string): number {
    return (a[property] || 0).length - (b[property] || 0).length;
  }

  const firstRow = content?.[0];
  const methods = sortRules.map((rule: ISort) => {
    const type = typeof firstRow[rule.property];
    if (type === 'string') return getResultForString;
    if (Array.isArray(firstRow[rule.property])) return getResultForArray;
    return getResultForNumber;
  });

  const length = sortRules.length;
  return [...content].sort((a: any, b: any) => {
    for (let i = 0; i < length; i++) {
      const rule = sortRules[i];
      const result = methods[i](a, b, rule.property);
      if (result) return result * rule.direction;
    }
    return 0;
  });
}

interface IFakeLoader {
  content?: any,
  pagination?: IPaginationRequest,
  query?: string,
  mode?: string,
  sort?: ISort[],
}

export default function getFakeLoader({
  content,
  pagination,
  query,
  mode,
  sort,
}: IFakeLoader) {
  const formattedContent = content || [];
  const filteredContent = query
    ? formattedContent.filter((item:any) => item.name.toLowerCase().includes(query?.toLowerCase()))
    : formattedContent;

  const sortedContent = sort
    ? getSortedContent(filteredContent, sort || [])
    : filteredContent;

  if (!pagination || mode === 'print') {
    return Promise.resolve({
      size: sortedContent?.length || 0,
      number: 0,
      totalPages: 1,
      totalElements: sortedContent?.length || 0,
      sort: sort || [],
      content: sortedContent || [],
    });
  }

  const size = pagination.size || 10;
  const page = pagination.page || 0;
  const begin = size * page;
  const end = begin + size;
  const totalElements = sortedContent.length;
  const totalPages = Math.ceil(totalElements / size);

  const response = {
    size,
    number: page,
    totalPages,
    totalElements,
    sort: sort || [],
    content: sortedContent.slice(begin, end) || [],
  };

  return Promise.resolve(response);
}
