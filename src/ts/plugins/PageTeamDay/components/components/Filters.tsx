import React from 'react';
import { observer } from 'mobx-react-lite';

import type Filter from 'ts/components/Layout/Search/interfaces/Filter';
import { getShortDateRange, ONE_DAY } from 'ts/helpers/formatter';
import {
  UiKitDate,
  UiKitButton,
} from 'ts/components/UiKit';
import styleSearch from 'ts/components/Layout/Search/styles/index.module.scss';
import style from '../styles/index.module.scss';

export function getFormattedWeeks(rows: any[]) {
  const groups = (rows || []).reduce((group: any, row: any) => {
    if (!group[row.week]) group[row.week] = [];
    group[row.week].push(row);
    return group;
  }, {});

  return Object.entries(groups).map((item: any) => {
    const firstDay = item[1][0];
    const lastDay = item[1][(item[1].length - 1)];
    return {
      id: firstDay.week,
      days: item[1],
      title: getShortDateRange({
        from: firstDay.timestamp,
        to: lastDay.timestamp,
      }),
    };
  });
}

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
  const prevNext = (direction: number) => {
    const diff = (Math.abs(filters?.to - filters?.from) + ONE_DAY) * direction;
    if (onChange) onChange({
      ...(filters || {}),
      from: filters?.from + diff,
      to: filters?.to + diff,
      hash: Math.random(),
    });
  };

  return (
    <>
      <div className={styleSearch.layout_search_select}>
        <UiKitButton
          mode="second"
          disabled={!filters?.from || !filters?.to}
          onClick={() => prevNext(-1)}
        >
          «
        </UiKitButton>
        <UiKitDate
          className={style.team_team_day_filters_prev}
          value={filters?.from || undefined}
          onChange={(value: string) => update('from', (new Date(value)).getTime())}
        />
      </div>

      <div className={styleSearch.layout_search_select}>
        <UiKitDate
          className={style.team_team_day_filters_next}
          value={filters?.to || undefined}
          onChange={(value: string) => update('to', (new Date(value)).getTime())}
        />
        <UiKitButton
          mode="second"
          disabled={!filters?.from || !filters?.to}
          onClick={() => prevNext(1)}
        >
          »
        </UiKitButton>
      </div>
    </>
  );
});

export default Filters;
