import React from 'react';
import { Link } from 'react-router-dom';

import localization from 'ts/helpers/Localization';

import style from '../../styles/sidebar.module.scss';

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
        alt={title || ''}
      />
      <figcaption className={style.sidebar_item_title}>
        {localization.get(title)}
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
