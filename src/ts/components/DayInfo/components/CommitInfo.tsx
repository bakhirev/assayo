import React from 'react';

import { getShortTime } from 'ts/helpers/formatter';

import style from '../index.module.scss';

interface ICommit {
  date: string;
  message: string;
}

interface CommitInfoProps {
  commits: ICommit[];
}

export default function CommitInfo({ commits }: CommitInfoProps): React.ReactElement {
  const items = commits.map((commit: any) => {
    return (
      <div
        key={commit.date}
        className={style.day_info_row}
      >
        <span className={style.day_info_date}>
          {getShortTime(commit.date)}
        </span>
        <span className={style.day_info_message}>
          {commit.message}
        </span>
      </div>
    );
  });
  return (<>{items}</>);
}
