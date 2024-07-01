import React from 'react';

import ExternalLink from '../index';
import userSettings from 'ts/store/UserSettings';

interface IPRLinkProps {
  prId?: string,
  text?: string,
  className?: string,
}

function PRLink({ prId, text, className }: IPRLinkProps) {
  if (!prId) return null;

  const prefix = userSettings?.settings?.linksPrefix?.task || '/';

  return (
    <ExternalLink
      text={text || 'PR'}
      link={`${prefix}${prId}`}
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
