import React from 'react';

import ExternalLink from './ExternalLink';
import { getTaskHref } from '../helpers';

interface TaskLinkProps {
  task?: string,
  className?: string,
}

function TaskLink({ task = '', className = '' }: TaskLinkProps) {
  const link = getTaskHref(task);
  if (!link) return null;

  return (
    <ExternalLink
      text={task}
      link={link}
      className={className}
    />
  );
}

export default TaskLink;
