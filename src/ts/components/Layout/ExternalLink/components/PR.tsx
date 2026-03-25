import React from 'react';

import ExternalLink from './ExternalLink';
import applicationConfig from 'ts/store/ApplicationConfig';

interface PRLinkProps {
  prId?: string,
  text?: string,
  className?: string,
}

function PRLink({ prId, text, className }: PRLinkProps) {
  if (!prId) return null;

  const prefix = applicationConfig?.config?.prefixForPR || '/';
  const formattedTask = prId?.[0] === '#'
    ? prId.replace('#', '')
    : prId;

  return (
    <ExternalLink
      text={text || 'PR'}
      link={`${prefix}${formattedTask}`}
      className={className}
    />
  );
}

PRLink.defaultProps = {
  prId: '',
  text: '',
  className: '',
};

export default PRLink;
