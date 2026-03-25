import React from 'react';
import { observer } from 'mobx-react-lite';

import type Filter from 'ts/components/Layout/Search/interfaces/Filter';
import UiKitCheckbox from 'ts/components/UiKit/components/Checkbox';

import style from '../styles/index.module.scss';

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
    <div className={style.team_country_filter}>
      <UiKitCheckbox
        title="plugin.team_country.filters.active"
        className={style.team_country_filter_checkbox}
        value={filters?.isActive}
        onChange={() => update('isActive', !filters?.isActive)}
      />
      <UiKitCheckbox
        title="plugin.team_country.filters.dismissed"
        className={style.team_country_filter_checkbox}
        value={filters?.isDismissed}
        onChange={() => update('isDismissed', !filters?.isDismissed)}
      />
      <UiKitCheckbox
        title="plugin.team_country.filters.staff"
        className={style.team_country_filter_checkbox}
        value={filters?.isStaff}
        onChange={() => update('isStaff', !filters?.isStaff)}
      />
    </div>
  );
});

export default Filters;
