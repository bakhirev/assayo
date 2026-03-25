import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'ts/components/Translation';

import UiKitCheckbox from 'ts/components/UiKit/components/Checkbox';
import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';
import { Filters } from 'ts/components/YearChart/interfaces/Filters';
import statisticStore from 'ts/store/Statistics';

import style from './index.module.scss';

function getFormattedUsers(rows: any[], titleForAll: string) {
  const options = rows.map((title: string, id: number) => ({ id: id + 1, title }));
  options.unshift({ id: 0, title: titleForAll });
  return options;
}

interface MonthFiltersProps {
  filters: Filters;
  onChange: Function;
}

const MonthFilters = observer(({
  filters,
  onChange,
}: MonthFiltersProps): React.ReactElement => {
  const { text } = useTranslation();

  const authors = statisticStore.statisticsByCommits.author.list;
  const types = statisticStore.statisticsByCommits.type.list;
  const authorsOptions = useMemo(() => getFormattedUsers(authors, text('plugin.team_month.filters.authors')), [authors]);
  const typesOptions = useMemo(() => getFormattedUsers(types, text('plugin.team_month.filters.types')), [types]);
  const update = (property: string, value: any) => {
    onChange({
      ...filters,
      [property]: value,
    });
  };

  return (
    <div className={style.team_month_filter}>
      <SelectWithButtons
        className={style.team_month_filter_select}
        value={filters?.authors?.[0] || authorsOptions[0]}
        options={authorsOptions}
        onChange={(id: number) => update('authors', [authorsOptions[id]])}
      />
      <SelectWithButtons
        className={style.team_month_filter_select}
        value={filters?.types?.[0] || typesOptions[0]}
        options={typesOptions}
        onChange={(id: number) => update('types', [typesOptions[id]])}
      />
      <UiKitCheckbox
        title="plugin.team_month.filters.release"
        className={style.team_month_filter_checkbox}
        value={filters.release}
        onChange={() => update('release', !filters.release)}
      />
      <UiKitCheckbox
        title="plugin.team_month.filters.absence"
        className={style.team_month_filter_checkbox}
        value={filters.absence}
        onChange={() => update('absence', !filters.absence)}
      />
      <UiKitCheckbox
        title="plugin.team_month.filters.firstLastDays"
        className={style.team_month_filter_checkbox}
        value={filters.firstLastDays}
        onChange={() => update('firstLastDays', !filters.firstLastDays)}
      />
    </div>
  );
});

export default MonthFilters;
