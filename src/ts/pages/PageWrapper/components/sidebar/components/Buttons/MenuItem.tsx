import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'ts/components/Translation';

import style from '../../index.module.scss';

interface ISideBarMenuItemProps {
  id: string;
  link: string;
  title?: string;
  icon?: any;
  isSelected?: boolean;
}

function SideBarMenuItem({
  id,
  link,
  title,
  icon,
  isSelected,
}: ISideBarMenuItemProps) {
  const { t } = useTranslation();
  return (
    <Link
      key={id}
      className={`${style.sidebar_item} ${isSelected ? style.selected : ''}`}
      to={link}
      id={`sidebar-menu-${id}`}
    >
      <img
        className={style.sidebar_item_icon}
        src={icon}
      />
      <figcaption className={style.sidebar_item_title}>
        {t(title || '')}
      </figcaption>
    </Link>
  );
}

SideBarMenuItem.defaultProps = {
  title: '',
  icon: '',
  isSelected: false,
};

export default SideBarMenuItem;
