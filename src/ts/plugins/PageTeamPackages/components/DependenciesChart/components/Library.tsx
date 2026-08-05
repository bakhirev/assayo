import React from 'react';

import { Package } from 'ts/helpers/StatisticsByPackageJson/components/packages';
import style from '../styles/index.module.scss';

interface LibraryProps {
  item: Package;
  isParent?: boolean;
  isChildren?: boolean;
  selected?: boolean;
  onClick: (group: Package) => void;
}

export function Library({ item, isParent, isChildren, selected, onClick }: LibraryProps) {
  if (!item) return null;

  const className = [style.component_dependencies_chart_library];
  if (selected) {
    className.push(style.component_dependencies_chart_library_selected);
  } else if (isParent) {
    className.push(style.component_dependencies_chart_library_parent);
  } else if (isChildren) {
    className.push(style.component_dependencies_chart_library_children);
  }

  const needShowName = className.length > 1;

  const numberParents = item?.materializedPaths?.length;
  if (numberParents > 14) {
    className.push(style.component_dependencies_chart_library_size_l);
  } else if (numberParents > 5) {
    className.push(style.component_dependencies_chart_library_size_m);
  }

  return (
    <div
      id={`dependencies_chart_${item.id}`}
      className={className.join(' ')}
      onClick={() => {
        onClick(item);
      }}
    >
      {needShowName ? (
        <div
          title={item.id}
          className={style.component_dependencies_chart_library_title}
        >
          {item.id}
        </div>
      ) : null}
    </div>
  );
}

export default Library;
