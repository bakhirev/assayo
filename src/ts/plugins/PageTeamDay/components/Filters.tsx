import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';
import { getShortDateRange } from 'ts/helpers/formatter';
import dataGripStore from 'ts/store/DataGrip';

import style from 'ts/pages/Team/styles/filters.module.scss';

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

function getFormattedUsers(rows: any[], t: Function) {
  const options = rows.map((title: string, id: number) => ({ id: id + 1, title }));
  options.unshift({ id: 0, title: t('page.team.tree.filters.all') });
  return options;
}

interface ITempoFiltersProps {
  filters: {
    week?: number;
    user?: number;
  };
  onChange: Function;
}

const TempoFilters = observer(({
  filters,
  onChange,
}: ITempoFiltersProps): React.ReactElement => {
  const { t } = useTranslation();

  const rows = dataGripStore.dataGrip.timestamp.statistic.allCommitsByTimestamp || [];
  const weeks = useMemo(() => getFormattedWeeks(rows), [rows]);

  const authors = dataGripStore.dataGrip.author.list;
  const users = useMemo(() => getFormattedUsers(authors, t), [authors]);

  return (
    <div className={style.table_filters}>
      <SelectWithButtons
        title="page.team.tree.filters.author"
        value={filters.user}
        className={style.table_filters_item}
        options={users}
        onChange={(user: number) => {
          onChange({ ...filters, user });
        }}
      />
      <SelectWithButtons
        reverse
        title="page.team.tree.filters.author"
        value={filters.week || rows[rows.length - 1].week}
        className={style.table_filters_item}
        options={weeks.reverse()}
        onChange={(week: number) => {
          onChange({ ...filters, week });
        }}
      />
    </div>
  );
});

export default TempoFilters;
