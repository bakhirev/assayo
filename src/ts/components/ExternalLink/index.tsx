import React from 'react';
import { Link } from 'react-router-dom';

import TaskLink from './components/Task';
import PRLink from './components/PR';

import style from './index.module.scss';

interface IExternalLinkProps {
  link: string,
  text: string,
  className?: string,
}

function ExternalLink({ link, text, className }: IExternalLinkProps) {
  return (
    <Link
      to={link}
      target="_blank"
      className={`${style.external_link} ${className || ''}`}
    >
      {text}
    </Link>
  );
}

export { TaskLink, PRLink };
export default ExternalLink;
