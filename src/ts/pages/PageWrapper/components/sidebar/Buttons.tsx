import React from 'react';
import { useParams } from 'react-router-dom';

import SideBarMenuItem from './MenuItem';
import SideBarMenuGap from './MenuGap';
import { PERSON, TEAM } from '../../helpers/menu';

interface ISideBarButtonsProps {
  type: string;
}

function SideBarButtons({ type }: ISideBarButtonsProps) {
  const { page, userId } = useParams<any>();

  const list = type === 'team' ? TEAM : PERSON;
  const linkSuffix = type === 'team' ? '' : (userId || 0);
  const buttons = list.map((config, index: number) => {
    if (!config.id) {
      return <SideBarMenuGap key={index}/>;
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
