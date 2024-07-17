import React from 'react';
import { useTranslation } from 'react-i18next';

import ICommit from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';
import { PRLink, TaskLink } from 'ts/components/ExternalLink';
import { get2Number } from 'ts/helpers/formatter';
import dataGrip from 'ts/helpers/DataGrip';

import style from '../styles/task.module.scss';

function getFormattedTime(time: any) {
  return `${get2Number(time.hours)}:${get2Number(time.minutes)}`;
}

function getFormattedDate(commits: ICommit[]) {
  const from = commits[0];
  const to = commits[commits.length - 1];
  return from !== to
    ? `c ${getFormattedTime(from)} до ${getFormattedTime(to)}`
    : `до ${getFormattedTime(from)}`;
}

function getTags(commits: ICommit[]) {
  const uniqueTypes = new Set(commits.map((commit: ICommit) => commit.type));
  const tags = Array.from(uniqueTypes)
    .filter((title: string) => title && title !== '—')
    .map((title: string) => (
      <p
        key={title}
        className={style.tempo_task_tag}
      >
        {title}
      </p>
    ));
  return (<>{tags}</>);
}

interface ITaskProps {
  title: string;
  commits: ICommit[];
}

function Task({ title, commits }: ITaskProps) {
  const { t } = useTranslation();
  const prId = dataGrip.pr.prByTask[title];
  return (
    <div
      key={title}
      className={style.tempo_task}
    >
      <div className={style.tempo_task_header}>
        <div>
          {title ? (<TaskLink task={title}/>) : '—'}
          <PRLink prId={prId}/>
        </div>
        <div className={style.tempo_task_tags}>
          {getTags(commits)}
        </div>
      </div>
      <figure className={style.tempo_task_commits}>
        <figure>
          <img
            src="./assets/chart/commit.svg"
            className={style.tempo_task_icon}
          />
          <figcaption className={style.tempo_task_value}>
            {commits.length}
          </figcaption>
        </figure>
        <figcaption className={style.tempo_task_title}>
          {t('page.team.day.commits')}
        </figcaption>
      </figure>
      <figure className={style.tempo_task_hours}>
        <figure>
          <img
            src="./assets/chart/clock.svg"
            className={style.tempo_task_icon}
          />
          <figcaption className={style.tempo_task_value}>
            {getFormattedDate(commits)}
          </figcaption>
        </figure>
        <figcaption className={style.tempo_task_title}>
          {t('page.team.day.activity')}
        </figcaption>
      </figure>
    </div>
  );
}

interface ITasksProps {
  tasks: IHashMap<ICommit[]>;
}

function Tasks({ tasks }: ITasksProps) {
  const items = Object.entries(tasks).map(([title, commits]) => (
    <Task
      key={title}
      title={title}
      commits={commits}
    />
  ));

  return (
    <div className={style.tempo_task_wrapper}>
      {items}
    </div>
  );
}

export default Tasks;
