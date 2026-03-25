import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitInputNumber from 'ts/components/UiKit/components/InputNumber';

import type Filter from 'ts/components/Layout/Search/interfaces/Filter';
import style from 'ts/components/Layout/Search/styles/index.module.scss';

interface FiltersProps {
  filters?: Filter,
  onChange?: Function;
}

const Filters = observer(({
  filters,
  onChange,
}: FiltersProps) => {
  const update = (property: string, value: any) => {
    if (onChange) onChange({
      ...(filters || {}),
      [property]: value,
      hash: Math.random(),
    });
  };

  return (
    <div className={style.layout_search_select}>
      <UiKitInputNumber
        placeholder="plugin.team_files.filters.commits"
        help="plugin.team_files.filters.help"
        value={filters?.minCommits}
        onChange={(minCommits: number) => update('minCommits', minCommits)}
      />
    </div>
  );
});

export default Filters;
