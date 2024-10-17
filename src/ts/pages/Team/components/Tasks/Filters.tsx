import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';
import dataGripStore from 'ts/store/DataGrip';

import style from '../../styles/filters.module.scss';

function getFormattedUsers(rows: any[], t: Function) {
  const options = rows.map((title: string, id: number) => ({ id: id + 1, title }));
  options.unshift({ id: 0, title: t('page.team.tree.filters.all') });
  return options;
}

interface ITempoFiltersProps {
  filters: {
    company?: number;
    user?: number;
  };
  onChange: Function;
}

const TasksFilters = observer(({
  filters,
  onChange,
}: ITempoFiltersProps): React.ReactElement => {
  const { t } = useTranslation();

  const users = dataGripStore.dataGrip.author.list;
  const userOptions = useMemo(() => getFormattedUsers(users, t), [users]);

  const companies = dataGripStore.dataGrip.company.statistic.map((v: any) => v.company);
  const companyOptions = useMemo(() => getFormattedUsers(companies, t), [companies]);

  return (
    <div className={style.table_filters}>
      <SelectWithButtons
        title="page.team.tree.filters.author"
        value={filters.user}
        className={style.table_filters_item}
        options={userOptions}
        onChange={(user: number) => {
          onChange({ ...filters, user, company: 0 });
        }}
      />
      <SelectWithButtons
        title="page.team.tree.filters.author"
        value={filters.company}
        className={style.table_filters_item}
        options={companyOptions}
        onChange={(company: number) => {
          onChange({ ...filters, user: 0, company });
        }}
      />
    </div>
  );
});

export default TasksFilters;
