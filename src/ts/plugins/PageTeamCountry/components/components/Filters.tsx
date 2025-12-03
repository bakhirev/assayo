import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';
import UiKitCheckbox from 'ts/components/UiKit/components/Checkbox';
import { Title } from 'ts/components/Layout';

import IFilters from '../interfaces/Filters';
import { getOptions } from '../helpers';

import style from '../styles/index.module.scss';

interface FiltersProps {
  filters: IFilters,
  onChange: Function;
}

const Filters = observer(({
  filters,
  onChange,
}: FiltersProps) => {
  const companies = dataGripStore.dataGrip.company.statistic;
  const companyOptions = useMemo(() => getOptions(companies), companies);
  const update = (property: string, value: any) => {
    onChange({
      ...filters,
      [property]: value,
      hash: Math.random(),
    });
  };

  return (
    <>
      <Title title="common.filters"/>
      <div className={style.team_country_filter}>
        <SelectWithButtons
          title="page.team.tree.filters.author"
          className={style.team_country_filter_select}
          value={filters.company}
          options={companyOptions}
          onChange={(company: string) => update('company', company)}
        />
        <UiKitCheckbox
          title="page.team.country.filters.active"
          className={style.team_country_filter_checkbox}
          value={filters.isActive}
          onChange={() => update('isActive', !filters.isActive)}
        />
        <UiKitCheckbox
          title="page.team.country.filters.dismissed"
          className={style.team_country_filter_checkbox}
          value={filters.isDismissed}
          onChange={() => update('isDismissed', !filters.isDismissed)}
        />
        <UiKitCheckbox
          title="page.team.country.filters.staff"
          className={style.team_country_filter_checkbox}
          value={filters.isStaff}
          onChange={() => update('isStaff', !filters.isStaff)}
        />
      </div>
    </>
  );
});

export default Filters;
