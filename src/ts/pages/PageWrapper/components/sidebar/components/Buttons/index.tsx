import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { MenuItem } from 'ts/helpers/Plugins/interfaces/Plugin';
import plugins from 'ts/helpers/Plugins';
import sourceData from 'ts/store/SourceData';

import SideBarMenuItem from './MenuItem';
import MenuGap from './MenuGap';

interface SideBarButtonsProps {
  type: string;
}

const SideBarButtons = observer(({ type }: SideBarButtonsProps): React.ReactElement | null => {
  const { page, userId } = useParams<any>();

  const list: MenuItem[] = useMemo(() => {
    return type === 'team'
      ? plugins.getMenuItems('t')
      : plugins.getMenuItems('p');
  }, [type, sourceData.hash]);

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
});

export default SideBarButtons;
