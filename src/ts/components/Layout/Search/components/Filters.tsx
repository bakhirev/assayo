import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';

import Filter from '../interfaces/Filter';
import If from '../../If';
import SearchInput from './Search';
import getOptions from '../helpers/getOptions';
import style from '../styles/index.module.scss';

interface FiltersProps {
  elements?: string[],
  examples?: string[];
  placeholder?: string;
  filters: Filter,
  onChange: (filter: Filter) => void;
}

const Filters = observer(({
  elements,
  examples,
  placeholder,
  filters,
  onChange,
}: FiltersProps) => {
  const hash = statisticStore.hash;
  const statistics = statisticStore.statisticsByCommits;
  const users = useMemo(() => (
    getOptions('common.search.select.author', statistics.author.list)
  ), [hash]);
  const companies = useMemo(() => (
    getOptions('common.search.select.company', statistics.company.totalInfo, 'company')
  ), [hash]);
  const taskCodes = useMemo(() => (
    getOptions('common.search.select.taskCode', statistics.taskCodes.totalInfo, 'taskCode')
  ), [hash]);
  const types = useMemo(() => (
    getOptions('common.search.select.type', statistics.type.totalInfo, 'type')
  ), [hash]);
  const scopes = useMemo(() => (
    getOptions('common.search.select.scope', statistics.scope.totalInfo, 'scope')
  ), [hash]);

  // plac="common.search.placeholder"

  const update = (property: string, value: any) => {
    onChange({
      ...filters,
      [property]: value,
      hash: Math.random(),
    });
  };

  return (
    <>
      <If value={!elements || elements.includes('company')}>
        <SelectWithButtons
          value={filters.company}
          options={companies}
          className={style.layout_search_select}
          onChange={(value: string) => update('company', value)}
        />
      </If>
      <If value={!elements || elements.includes('taskCode')}>
        <SelectWithButtons
          value={filters.taskCode}
          options={taskCodes}
          className={style.layout_search_select}
          onChange={(value: string) => update('taskCode', value)}
        />
      </If>
      <If value={!elements || elements.includes('author')}>
        <SelectWithButtons
          value={filters.author}
          options={users}
          className={style.layout_search_select}
          onChange={(value: string) => update('author', value)}
        />
      </If>
      <If value={(!elements || elements.includes('scope') && scopes.length > 2)}>
        <SelectWithButtons
          value={filters.scope}
          options={scopes}
          className={style.layout_search_select}
          onChange={(value: string) => update('scope', value)}
        />
      </If>
      <If value={(!elements || elements.includes('type')) && types.length > 2}>
        <SelectWithButtons
          value={filters.type}
          options={types}
          className={style.layout_search_select}
          onChange={(value: string) => update('type', value)}
        />
      </If>
      <If value={!elements || elements.includes('search_small')}>
        <div className={style.layout_search_select}>
          <SearchInput
            filters={filters}
            examples={examples}
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>
      </If>
    </>
  );
});

export default Filters;
