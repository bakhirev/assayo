import React from 'react';

import ExternalLink from '../index';
import userSettings from 'ts/store/UserSettings';

interface ITaskLinkProps {
  task?: string,
  className?: string,
}

function TaskLink({ task, className }: ITaskLinkProps) {
  if (!task) return null;

  const prefix = userSettings?.settings?.linksPrefix?.task || '/';
  const formattedTask = task?.[0] === '#'
    ? task.replace('#', '')
    : task;

  return (
    <ExternalLink
      text={task}
      link={`${prefix}${formattedTask}`}
      className={className}
    />
  );
}

TaskLink.defaultProps = {
  task: '',
  className: '',
};

export default TaskLink;
