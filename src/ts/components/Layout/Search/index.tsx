import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import If from '../If';
import Filter from './interfaces/Filter';
import SearchInput from './components/Search';
import Filters from './components/Filters';
import getSearchMap from './helpers/getSearchMap';
import searchByQuery from './helpers/getSearchResult';
import getDefaultFilterFunc from './helpers/getDefaultFilterFunc';
import style from './styles/index.module.scss';

interface SearchProps {
  content?: any[];
  properties?: string | string[];
  className?: string;
  elements?: string[];
  placeholder?: string;
  examples?: string[];
  defaultFilters?: Filter;
  mode?: string;
  onChange: (content: any[], hash: string, filters: Filter) => void;
  onFilter?: (filters: Filter) => (item: any, ) => boolean;
  children?: ReactNode | string | null;
}

function Search({
  content,
  properties,
  examples,
  elements,
  placeholder,
  className,
  defaultFilters,
  mode,
  onChange,
  onFilter,
  children,
}: SearchProps) {
  const [filters, setFilters] = useState<Filter>({
    query: '',
    author: '',
    company: '',
    taskCode: '',
    type: '',
    scope: '',
    ...(defaultFilters || {}),
  });
  const searchMap = useMemo(() => getSearchMap(content || [], properties || ''), [content]);

  useEffect(() => {
    let result = content || [];
    if (filters.query) {
      const useSortBySearchIndex = mode === 'sort-by-searchIndex';
      result = searchByQuery(searchMap, filters.query as string, useSortBySearchIndex);
    }
    const filterFunction = (onFilter || getDefaultFilterFunc)(filters);
    result = result.filter(filterFunction);
    if (filters.hash) onChange(result, String(filters.hash), filters);
  }, [filters.hash]);

  const childrenWithProps = React.Children.map(
    children,
    (child) => (React.isValidElement(child)
      ? React.cloneElement(
        child,
        { filters, onChange: setFilters } as Partial<unknown>,
      ) : child),
  );

  return (
    <div className={style.layout_search}>
      <If value={elements && elements.includes('search')}>
        <div className={style.layout_search_query}>
          <SearchInput
            filters={filters}
            examples={examples}
            placeholder={placeholder}
            className={className}
            onChange={setFilters}
          />
        </div>
      </If>
      <div className={style.layout_search_selects}>
        <Filters
          elements={elements}
          examples={examples}
          placeholder={placeholder}
          filters={filters}
          onChange={setFilters}
        />
        <If value={childrenWithProps}>
          <div className={style.layout_search_select}>
            {childrenWithProps}
          </div>
        </If>
      </div>
    </div>
  );
}

export default Search;
