import React from 'react';

import ExternalLink from './ExternalLink';

interface GithubLinkProps {
  email?: string,
  className?: string,
}

function GithubLink({ email, className }: GithubLinkProps) {
  if (!email) return null;

  const login = (email.split('+').pop() || '').split('@').shift();
  if (!login) return null;

  return (
    <ExternalLink
      text={email}
      link={`https://github.com/${login}`}
      className={className}
    />
  );
}

GithubLink.defaultProps = {
  email: '',
  className: '',
};

export default GithubLink;
