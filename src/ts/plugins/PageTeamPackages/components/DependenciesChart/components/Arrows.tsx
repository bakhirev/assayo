import React from 'react';

import Arrow from './Arrow';

import style from '../styles/index.module.scss';

interface ArrowsProps {
  selectedConfig: any;
}

function Arrows({ selectedConfig }: ArrowsProps) {
  if (!selectedConfig?.parentArrows?.length
    && !selectedConfig?.childrenArrows?.length) return null;

  const padding = {
    top: 138,
    left: 258,
  };

  // eslint-disable-next-line react/display-name
  const getElement = (isParent: boolean) => (arrow: any) => (
    <Arrow
      key={`${arrow.from}${arrow.to}`}
      fromId={arrow.from}
      toId={arrow.to}
      padding={padding}
      isParent={isParent}
    />
  );
  const parentElements = selectedConfig?.parentArrows?.map(getElement(true));
  const childrenElements = selectedConfig?.childrenArrows?.map(getElement(false));

  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={style.component_dependencies_chart_arrows}
    >
      {parentElements}
      {childrenElements}
    </svg>
  );
}

export default Arrows;
