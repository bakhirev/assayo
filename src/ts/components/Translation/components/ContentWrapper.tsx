import React, { ReactNode, useRef } from 'react';

interface ContentWrapperProps {
  onClick: (height: number) => void;
  children?: ReactNode | string | null;
}

function ContentWrapper({ children, onClick }: ContentWrapperProps) {
  const ref = useRef() as React.MutableRefObject<HTMLSpanElement>;
  return (
    <span
      ref={ref}
      onClick={(event) => {
        event.stopPropagation();
        const size = ref?.current?.getBoundingClientRect();
        const padding = 4;
        onClick(size?.height + padding);
      }}
    >
      {children}
    </span>
  );
}

export default ContentWrapper;
