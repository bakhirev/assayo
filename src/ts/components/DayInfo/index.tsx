import React from 'react';
import { useTranslation } from 'react-i18next';

import dataGrip from 'ts/helpers/DataGrip';

import TaskInfo from './components/TaskInfo';

import style from './index.module.scss';

interface DayEvent {
  firstDay: Set<string> | undefined;
  lastDay: Set<string> | undefined;
  release: Set<string> | undefined;
}

interface DayInfoProps {
  timestamp: string;
  events?: DayEvent;
}

function DayInfo({ timestamp, events }: DayInfoProps): React.ReactElement {
  const { t } = useTranslation();
  let taskNumber = 0;

  const allCommitsByTimestamp = dataGrip.timestamp.statistic.allCommitsByTimestamp;
  const commitsByTimestamp = allCommitsByTimestamp.find((item: any) => item.timestamp === timestamp);
  const tasksByAuthor = commitsByTimestamp.tasksByAuthor || {};
  const order = dataGrip.author.list;

  const items = Object.entries(tasksByAuthor)
    .sort((a: any, b: any) => (order.indexOf(a[0]) - order.indexOf(b[0])))
    .map(([author, tasks]: [string, any]) => {
      taskNumber += Object.keys(tasks).length;

      let suffix = '';
      if (events?.firstDay?.has(author)) suffix = t('page.team.month.first');
      if (events?.lastDay?.has(author)) suffix = t('page.team.month.last');

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
};

export default DayInfo;
