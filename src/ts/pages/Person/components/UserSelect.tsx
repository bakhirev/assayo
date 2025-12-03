import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';
import style from 'ts/pages/Team/styles/filters.module.scss';
import { getFormattedWeeks } from 'ts/plugins/PageTeamDay/components/Filters';

interface IUserSelectProps {
  filters: any,
  onChange: Function,
}

const UserSelect = observer(({
  filters,
  onChange,
}: IUserSelectProps): React.ReactElement => {
  const { type, page, userId } = useParams<any>();
  const navigate = useNavigate();

  const formattedUserId = parseInt(userId || '0', 10) || 0;
  const authors = dataGripStore.dataGrip.author.list;
  const options = authors.map((title: string, id: number) => ({ id, title }));

  const rows = dataGripStore.dataGrip.timestamp.statistic.allCommitsByTimestamp || [];
  const weeks = useMemo(() => getFormattedWeeks(rows), [rows]);

  return (
    <div className={style.table_filters}>
      <SelectWithButtons
        title="page.team.tree.filters.author"
        value={formattedUserId}
        className={style.table_filters_item}
        options={options}
        onChange={(newUserId: number) => {
          navigate(`/${type}/${page}/${newUserId}`);
        }}
      />
      {page === 'day' ? (
        <SelectWithButtons
          reverse
          title="page.team.tree.filters.author"
          value={filters?.week || rows[rows.length - 1].week}
          className={style.table_filters_item}
          options={weeks.reverse()}
          onChange={(week: number) => {
            onChange({ ...filters, week });
          }}
        />
      ) : null}
    </div>
  );
});

export default UserSelect;
