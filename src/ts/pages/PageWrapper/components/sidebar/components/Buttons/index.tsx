import React from 'react';
import { useParams } from 'react-router-dom';

import { MenuItem } from 'ts/helpers/Plugins/interfaces/Plugin';
import plugins from 'ts/helpers/Plugins';

import SideBarMenuItem from './MenuItem';
import MenuGap from './MenuGap';

interface SideBarButtonsProps {
  type: string;
}

function SideBarButtons({ type }: SideBarButtonsProps) {
  const { page, userId } = useParams<any>();

  // @ts-ignore
  const list: MenuItem[] = type === 'team'
    ? plugins.getMenuItems('t')
    : plugins.getMenuItems('p');

  const linkSuffix = type === 'team' ? '' : (userId || 0);
  const buttons = list.map((config, index: number) => {
    if (!config.id) {
      return <MenuGap key={index}/>;
    }

    const isSelected = page === config.id
      || (!page && config.id === 'total');

    return (
      <SideBarMenuItem
        key={config.id}
        id={config.id}
        link={`${config.link}${linkSuffix}`}
        title={config.title}
        icon={config.icon}
        isSelected={isSelected}
      />
    );
  });

  return (
    <>
      {buttons}
    </>
  );
}

export default SideBarButtons;
