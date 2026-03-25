import React from 'react';

import ExternalLink from './ExternalLink';
import applicationConfig from 'ts/store/ApplicationConfig';

interface TaskLinkProps {
  task?: string,
  className?: string,
}

function TaskLink({ task, className }: TaskLinkProps) {
  if (!task) return null;

  const prefix = applicationConfig?.config?.prefixForTask || '/';
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
