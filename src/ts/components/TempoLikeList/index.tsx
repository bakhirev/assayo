import React from 'react';

import Day from './components/Day';
import Author from './components/Author';
import Task from './components/Task';
import { getTimeOnTask } from '../TempoByTable/helpers';

import style from './styles/index.module.scss';

interface TempoLikeListProps {
  days: any[];
  author?: string;
  order?: string[];
}

function TempoLikeList({
  days,
  author,
  order,
}: TempoLikeListProps) {
  const list: any = [];

  days.forEach((dayInfo: any) => {
    list.push(
      <Day
        key={dayInfo.timestamp}
        timestamp={dayInfo.timestamp}
        day={dayInfo.day}
      />,
    );

    const authors = order || Object.keys(dayInfo.tasksByAuthor);
    authors.forEach((taskAuthor) => {
      if (author && taskAuthor !== author) return;
      const tasks = Object.keys(dayInfo.tasksByAuthor[taskAuthor] || {});
      if (!tasks?.length) return;

      if (!author) {
        list.push(
          <Author
            key={`${dayInfo.timestamp}${taskAuthor}`}
            author={taskAuthor}
          />,
        );
      }

      const timeOnTask = getTimeOnTask(tasks);

      tasks.forEach((task, index) => {
        list.push(
          <Task
            key={`${dayInfo.timestamp}${taskAuthor}${task}`}
            task={task}
            hours={timeOnTask[index]}
          />,
        );
      });
    });
  });

  return (
    <div className={style.tempo_like_list}>
      {list}
    </div>
  );
}

export default TempoLikeList;
