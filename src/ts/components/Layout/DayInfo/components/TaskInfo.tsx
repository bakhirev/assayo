import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import { PRLink, TaskLink } from 'ts/components/Layout';
import dataGrip from 'ts/helpers/DataGrip';

import CommitInfo from './CommitInfo';

import style from '../index.module.scss';

interface ICommit {
  date: string;
  message: string;
}

interface TaskInfoProps {
  tasks: IHashMap<ICommit>;
}

export default function TaskInfo({ tasks }: TaskInfoProps): React.ReactElement {
  const items = Object.entries(tasks)
    .map(([task, commits]: [string, any]) => {
      const taskInfo = dataGrip.tasks.statisticByName.get(task);
      const milliseconds = commits[0].milliseconds;
      const prId = taskInfo?.prIds?.find((id: string) => {
        const pr = dataGrip.pr.pr.get(id);
        return pr.dateMerge >= milliseconds;
      });

      return (
        <div key={`${prId}${task}`}>
          <div className={style.day_info_link}>
            <TaskLink task={task}/>
            <PRLink prId={prId}/>
          </div>
          <CommitInfo commits={commits}/>
        </div>
      );
    });

  return (<>{items}</>);
}
