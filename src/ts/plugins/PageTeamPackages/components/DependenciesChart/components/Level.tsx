import React from 'react';

import { Package } from 'ts/helpers/StatisticsByPackageJson/components/packages';
import Library from './Library';
import style from '../styles/index.module.scss';

interface DependenciesChartProps {
  group: Package[];
  selectedConfig: any;
  onClick: (group: Package) => void;
}

export function Level({ group, selectedConfig, onClick }: DependenciesChartProps) {
  if (!group.length) return null;

  const groupElements = group.map((item) => (
    <Library
      key={item.id}
      item={item}
      isParent={selectedConfig?.parentIds?.has(item.id)}
      isChildren={selectedConfig?.childrenIds?.has(item.id)}
      selected={item.id === selectedConfig?.selectedId}
      onClick={onClick}
    />
  ));

  return (
    <div className={style.component_dependencies_chart_level}>
      {groupElements}
    </div>
  );
}

export default Level;
