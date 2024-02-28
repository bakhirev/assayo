import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import settingsForm from 'ts/pages/Settings/store/Form';

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
  const { t } = useTranslation();
  const formattedTitle = t(title || '');
  return (
    <Link
      key={id}
      className={`${style.sidebar_item} ${isSelected ? style.selected : ''}`}
      to={link}
      title={formattedTitle}
      id={`sidebar-menu-${id}`}
      onClick={() => {
        if (settingsForm.isEdited) {
          settingsForm.clear();
          settingsForm.setInitState(settingsForm.initState);
        }
      }}
    >
      <img
        className={style.sidebar_item_icon}
        src={icon}
        alt={title || ''}
      />
      <figcaption className={style.sidebar_item_title}>
        {formattedTitle}
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
