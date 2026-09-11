import React from 'react';

import ExternalLink from './ExternalLink';
import { getPRHref } from '../helpers';

interface PRLinkProps {
  prId?: string,
  text?: string,
  className?: string,
}

function PRLink({ prId = '', text = '', className = '' }: PRLinkProps) {
  const link = getPRHref(prId);
  if (!link) return null;

  return (
    <ExternalLink
      text={text || 'PR'}
      link={link}
      className={className}
    />
  );
}

export default PRLink;
