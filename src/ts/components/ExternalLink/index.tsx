import React from 'react';
import { Link } from 'react-router-dom';

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

export default ExternalLink;
