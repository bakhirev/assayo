import React from 'react';

interface IfProps {
  value?: any;
  children: React.ReactNode | React.ReactNode[];
}

function If({
  value,
  children,
}: IfProps) {
  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;

  return <>{children}</>;
}

export default If;
