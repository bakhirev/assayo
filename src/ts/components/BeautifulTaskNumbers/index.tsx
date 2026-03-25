import React from 'react';

import ICommit from 'ts/interfaces/Commit';

import TaskNumberItem from './components/Item';
import style from './styles/index.module.scss';

interface BeautifulTaskNumbersProps {
  list: ICommit[];
  mode?: string;
}

function BeautifulTaskNumbers({ list, mode }: BeautifulTaskNumbersProps) {
  const items = list?.map((commit: ICommit) => (
    <TaskNumberItem
      key={commit.taskNumber}
      commit={commit}
      mode={mode}
    />
  ));

  return (
    <div className={style.component_beautiful_tn_container}>
      {items}
    </div>
  );
}

export default BeautifulTaskNumbers;
