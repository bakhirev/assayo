import React, { ReactNode } from 'react';

interface IWrapperProps {
  children: ReactNode
}

function Wrapper({ children }: IWrapperProps) {
  const className = 'authorization-sidebar';
  return (
    <div className="authorization">
      <div className={className}>
        <div className="authorization-header" />
        {children}
      </div>
    </div>
  );
}

export default Wrapper;
