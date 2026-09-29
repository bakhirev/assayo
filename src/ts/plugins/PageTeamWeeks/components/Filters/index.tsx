import React from 'react';
import { observer } from 'mobx-react-lite';

import type Filter from 'ts/components/Layout/Search/interfaces/Filter';
import { UiKitButton, UiKitDateWeek } from 'ts/components/UiKit';
import styleSearch from 'ts/components/Layout/Search/styles/index.module.scss';
import { StatisticsWeek } from 'ts/helpers/StatisticsByCommits/components/week';

import style from './index.module.scss';

interface FiltersProps {
  rows: StatisticsWeek[],
  filters?: Filter,
  onChange?: Function;
}

function getIndexByWeek(rows: StatisticsWeek[], week: string) {
  for (let i = 0, l = rows.length; i < l; i++) {
    if (rows[i]?.week === week) return i;
  }
  return 0;
}

const Filters = observer(({
  rows,
  filters,
  onChange,
}: FiltersProps) => {
  const update = (index: number) => {
    const row = rows[index];
    if (row && onChange) onChange({
      ...(filters || {}),
      week: row.week,
      index: index,
      hash: Math.random(),
    });
  };

  return (
    <div className={styleSearch.layout_search}>
      <div className={styleSearch.layout_search_selects}>
        <div className={styleSearch.layout_search_select}>
          <UiKitButton
            mode="second"
            disabled={filters?.index === (rows.length - 1)}
            onClick={() => {
              update(filters?.index + 1);
            }}
          >
            «
          </UiKitButton>
          <UiKitDateWeek
            className={style.team_weeks_filters_middle}
            value={filters?.week || undefined}
            onChange={(value: string) => {
              update(getIndexByWeek(rows, value));
            }}
          />
          <UiKitButton
            mode="second"
            disabled={filters?.index === 0}
            onClick={() => {
              update(filters?.index - 1);
            }}
          >
            »
          </UiKitButton>
        </div>
      </div>
    </div>
  );
});

export default Filters;
