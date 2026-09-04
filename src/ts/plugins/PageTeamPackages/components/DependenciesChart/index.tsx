import React, { useMemo, useState } from 'react';

import statisticsByPackageJson from 'ts/helpers/StatisticsByPackageJson';
import { Package } from 'ts/helpers/StatisticsByPackageJson/components/packages';

import Level from './components/Level';
import Arrows from './components/Arrows';

import style from './styles/index.module.scss';

function getGroupsByLevel(packages: Package[]) {
  return packages.reduce((acc: Package[][], item: Package) => {
    if (!acc[item.level]) acc[item.level] = [];
    acc[item.level].push(item);
    return acc;
  }, []);
}

interface DependenciesChartProps {
  packages: Package[];
}

function getAllNodes(firstId: string, property: string) {
  const totalInfoByName = statisticsByPackageJson.packages.totalInfoByName;
  const response = new Set<string>();
  const arrows: any[] = [];
  const stack = [firstId];
  while (stack.length) {
    const id = stack.shift();
    const item = totalInfoByName.get(id);
    const listIds = item?.[property] || [];
    listIds.forEach((childrenId: string) => {
      if (response.has(childrenId)) return;
      response.add(childrenId);
      stack.push(childrenId);
      arrows.push({ from: id, to: childrenId });
    });
  }
  return [arrows, Array.from(response)];
}

export function DependenciesChart({ packages }: DependenciesChartProps) {
  if (!packages) return null;

  const [selectedId, setSelectedId] = useState<string>('');

  const totalInfoByName = statisticsByPackageJson.packages.totalInfoByName;
  const selectedConfig = useMemo(() => {
    const item = totalInfoByName.get(selectedId);
    const [parentArrows, parentIds] = getAllNodes(selectedId, 'parentIds');
    const [childrenArrows, childrenIds] = getAllNodes(selectedId, 'childrenIds');
    return {
      selectedId: item?.id,
      parentIds: new Set(parentIds),
      childrenIds: new Set(childrenIds),
      parentArrows,
      childrenArrows,
    };
  }, [selectedId]);

  const groups = getGroupsByLevel(packages);
  const groupsElements = groups.map((group, index) => (
    <Level
      key={index}
      group={group}
      selectedConfig={selectedConfig}
      onClick={(item: Package) => {
        if (item.id === selectedId) {
          setSelectedId('');
        } else {
          setSelectedId(item.id);
        }
      }}
    />
  ));

  console.log(groups);
  return (
    <div className={style.component_dependencies_chart}>
      {groupsElements}
      <Arrows selectedConfig={selectedConfig} />
    </div>
  );
}

export default DependenciesChart;
