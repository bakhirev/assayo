import React from 'react';

import ICommit from 'ts/interfaces/Commit';
import { PRLink, TaskLink } from 'ts/components/ExternalLink';
import { getDate } from 'ts/helpers/formatter';
import dataGrip from 'ts/helpers/DataGrip';

import style from '../styles/index.module.scss';

interface IGetItemProps {
  commit: ICommit;
  mode?: string;
}

function GetItem({ commit, mode }: IGetItemProps) {
  const size = commit.taskNumber?.length || 1;
  const className = size > 5
    ? style.get_list_big_number
    : '';
  const prId = dataGrip.pr.prByTask[commit.task];

  return (
    <div className={style.get_list}>
      <div className={style.get_list_title}>
        <TaskLink
          task={commit.task}
          className={style.get_list_task}
        />
        {mode !== 'print' && (
          <PRLink
            text="pull request"
            prId={prId}
            className={style.get_list_pr}
          />
        )}
      </div>
      <div className={`${style.get_list_icon} ${className}`}>
        {commit.taskNumber}
      </div>
      <div className={style.get_list_date}>
        {getDate(commit.date)}
      </div>
    </div>
  );
}

export default GetItem;
