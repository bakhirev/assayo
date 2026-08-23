import React from 'react';
import { observer } from 'mobx-react-lite';

import { TaskLink } from 'ts/components/Layout';

import style from '../styles/index.module.scss';
import statisticStore from 'ts/store/StatisticsByCommitsStore';

interface FirstCellProps {
  tasks: any[];
}

const FirstColumn = observer(({ tasks }: FirstCellProps): React.ReactElement => {
  const totalInfoByName = statisticStore.statisticsByCommits.tasks.totalInfoByName;
  const rows = tasks.map(([task]) => {
    const description = totalInfoByName.get(task)?.description || '';
    return (
      <div
        key={task}
        className={style.tempo_by_table_row}
      >
        <div
          className={style.tempo_by_table_task}
          title={description}
        >
          <TaskLink task={task}/>
        </div>
      </div>
    );
  });

  return (
    <div className={style.tempo_by_table_first_column}>
      {rows}
    </div>
  );
});

export default FirstColumn;
