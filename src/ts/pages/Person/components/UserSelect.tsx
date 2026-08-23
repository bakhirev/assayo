import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/StatisticsByCommitsStore';
import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';
import style from 'ts/pages/Team/styles/filters.module.scss';

const UserSelect = observer((): React.ReactElement => {
  const { type, page, userId } = useParams<any>();
  const navigate = useNavigate();

  const formattedUserId = parseInt(userId || '0', 10) || 0;
  const authors = statisticStore.statisticsByCommits.author.list;
  const options = authors.map((title: string, id: number) => ({ id, title }));

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
    </div>
  );
});

export default UserSelect;
