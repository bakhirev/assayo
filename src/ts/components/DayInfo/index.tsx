import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import { getShortTime } from 'ts/helpers/formatter';

import style from './index.module.scss';

interface ICommit {
  date: string;
  message: string;
}

type ITask = IHashMap<ICommit>;

type IDayInfo = IHashMap<ITask>;

function CommitInfo({ commits }: { commits: ICommit[] }): React.ReactElement {
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

function TaskInfo({ tasks }: { tasks: ITask }): React.ReactElement {
  const items = Object.entries(tasks)
    .map(([task, commits]: [string, any]) => {
      return (
        <div key={task}>
          <div className={style.day_info_task}>{task}</div>
          <CommitInfo commits={commits}/>
        </div>
      );
    });
  return (<>{items}</>);
}

interface IDayInfoProps {
  day: IDayInfo,
  order: string[]
}

function DayInfo({ day, order }: IDayInfoProps): React.ReactElement {
  let taskNumber = 0;
  const items = Object.entries(day?.tasksByAuthor)
    .sort((a: any, b: any) => (order.indexOf(a[0]) - order.indexOf(b[0])))
    .map(([author, tasks]: [string, any]) => {
      taskNumber += Object.keys(tasks).length;
      return (
        <div
          key={author}
          className={style.day_info}
        >
          <h3 className={style.day_info_author}>{author}</h3>
          <TaskInfo tasks={tasks}/>
        </div>
      );
    });

  return (
    <div
      className={style.day_info_wrapper}
      style={{ columnCount: taskNumber > 20 ? 2 : 1 }}
    >
      {items}
    </div>
  );
}

export default DayInfo;
