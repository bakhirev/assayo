import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/StatisticsByCommitsStore';
import { TaskLink } from 'ts/components/Layout';
import { getStringWithCapitalLetter } from 'ts/helpers/formatter';

import style from '../styles/index.module.scss';

interface DayProps {
  task?: string;
  hours?: number;
}

const Day = observer(({ task, hours }: DayProps): React.ReactElement => {
  const totalInfoByName = statisticStore.statisticsByCommits.tasks.totalInfoByName;
  const info = totalInfoByName.get(task);

  return (
    <div className={style.tempo_like_list_task}>
      <div className={style.tempo_like_list_task_number}>
        <TaskLink task={task}/>
        <span className={style.tempo_like_list_task_hours}>
          {`(${hours}h)`}
        </span>
      </div>
      <div className={style.tempo_like_list_task_spit}>
        {info?.description ? '—' : ''}
      </div>
      <div className={style.tempo_like_list_task_description}>
        {getStringWithCapitalLetter(info?.description)}
      </div>
    </div>
  );
});

export default Day;
