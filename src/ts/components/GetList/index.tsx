import React from 'react';

import ICommit from 'ts/interfaces/Commit';

import GetItem from './components/Item';
import style from './styles/index.module.scss';

interface IAchievementsProps {
  list: ICommit[];
  mode?: string;
}

function GetList({ list, mode }: IAchievementsProps) {
  const items = list?.map((commit: ICommit) => (
    <GetItem
      key={commit.taskNumber}
      commit={commit}
      mode={mode}
    />
  ));

  return (
    <div className={style.get_list_container}>
      {items}
    </div>
  );
}

export default GetList;
