import React from 'react';
import { useTranslation } from 'react-i18next';

import IHashMap from 'ts/interfaces/HashMap';
import ExternalLink from 'ts/components/ExternalLink';
import userSettings from 'ts/store/UserSettings';
import { getShortTime } from 'ts/helpers/formatter';
import dataGrip from 'ts/helpers/DataGrip';

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
      const prId = dataGrip.pr.prByTask[task];
      return (
        <>
          <div className={style.day_info_link}>
            <ExternalLink
              link={`${userSettings?.settings?.linksPrefix?.task || '/'}${task}`}
              text={task}
            />
            {prId && (
              <ExternalLink
                link={`${userSettings?.settings?.linksPrefix?.pr || '/'}${prId}`}
                text="PR"
              />
            )}
          </div>
          <CommitInfo commits={commits}/>
        </>
      );
    });
  return (<>{items}</>);
}

interface IDayInfoProps {
  day: IDayInfo;
  order: string[];
  events?: any;
  timestamp?: string;
}

function DayInfo({ day, order, events, timestamp }: IDayInfoProps): React.ReactElement {
  const { t } = useTranslation();
  const firstCommit = events?.firstCommit?.[timestamp || ''] || [];
  const lastCommit = events?.lastCommit?.[timestamp || ''] || [];
  let taskNumber = 0;

  const items = Object.entries(day?.tasksByAuthor)
    .sort((a: any, b: any) => (order.indexOf(a[0]) - order.indexOf(b[0])))
    .map(([author, tasks]: [string, any]) => {
      taskNumber += Object.keys(tasks).length;

      let suffix = '';
      if (firstCommit.includes(author)) suffix = t('page.team.month.first');
      if (lastCommit.includes(author)) suffix = t('page.team.month.last');

      return (
        <div
          key={author}
          className={style.day_info}
        >
          <h3 className={style.day_info_author}>
            {`${author} ${suffix}`}
          </h3>
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

DayInfo.defaultProps = {
  events: undefined,
  timestamp: undefined,
};

export default DayInfo;
