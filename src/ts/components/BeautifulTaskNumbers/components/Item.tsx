import React from 'react';

import ICommit from 'ts/interfaces/Commit';
import { PRLink, TaskLink } from 'ts/components/Layout';
import { getDate } from 'ts/helpers/formatter';
import statisticsByCommits from 'ts/helpers/StatisticsByCommits';

import style from '../styles/index.module.scss';

interface TaskNumberItemProps {
  commit: ICommit;
  mode?: string;
}

function TaskNumberItem({ commit, mode }: TaskNumberItemProps) {
  const size = `${commit.taskNumber}`.length || 1;
  const className = size > 5
    ? style.component_beautiful_tn_big_number
    : '';
  const task = statisticsByCommits.tasks.totalInfoByName.get(commit.task);
  const prId = statisticsByCommits.pr.totalInfoByName.get(task?.prIds?.[0]);

  return (
    <div className={style.component_beautiful_tn}>
      <div className={style.component_beautiful_tn_title}>
        <TaskLink
          task={commit.task}
          className={style.component_beautiful_tn_task}
        />
        {mode !== 'print' && (
          <PRLink
            text="pull request"
            prId={prId}
            className={style.component_beautiful_tn_pr}
          />
        )}
      </div>
      <div className={`${style.component_beautiful_tn_icon} ${className}`}>
        {commit.taskNumber}
      </div>
      <div className={style.component_beautiful_tn_date}>
        {getDate(commit.date)}
      </div>
    </div>
  );
}

export default TaskNumberItem;
